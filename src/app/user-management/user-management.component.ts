import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersModel } from '../models/UsersModel';
import { UserManagementService } from '../services/user-management.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RolesService } from '../services/roles.service';
import { RolesModel } from '../models/RolesModel';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { UserRolesModel } from '../models/UserRolesModel';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  // Array of Users
  displayedColumns: string[] = ['username', 'displayName', 'password', 'email', 'isActive', 'insertDate', 'insertUser', 'role', 'actions'];
  dataSource: MatTableDataSource<UsersModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;
  total: number;
  users: UsersModel[] = [];
  isLoading = true;

  userId: number;
  username: string = '';
  roles: RolesModel[];
  roleId: number;
  roleName: string;
  userRoleId: number;
  displayName: string;
  isActive = 0;
  email: string;
  password: string;
  password2: string;
  updateUserId: number;

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  constructor(private service: UserManagementService, private roleService: RolesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe((data: UsersModel[]) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updateTotal();
    });
  }

  // Method to filter the displayed data, used for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.updateTotal();
  }

  // Method to remove an element from the array
  removeItem(element){
    if(element.userId === 1){
      swal('Not Allowed', 'This user cannot be removed', 'warning');
      return false;
    }
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: {
          text: 'Delete'
        }
      }
    }).then((value) => {
      if(value){
        this.service.removeUser(element.userId).subscribe((data: ResponseModel) => {
          swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
          this.getAllUsers();
        })
      }
    });
  }

  // Method to return selected centre details
  selectedUser(element){
    console.log(element);
  }

  // Method to update the number of total available records in the array
  updateTotal(){
    this.total = this.dataSource.filteredData.length == undefined ? this.dataSource.data.length : this.dataSource.filteredData.length;
    this.isLoading = false;
  }

  // Method to export to Excel
  exportTable(){

  }


  openNewUser(content){
    this.userId = 0;
    this.username = '';
    this.roleId = 0;
    this.userRoleId = 0;
    this.displayName = '';
    this.isActive = 0;
    this.email = '';
    this.password = '';
    this.password2 = '';
    this.editMode = false;
    this.roleService.getAllRoles().subscribe((data: RolesModel[]) => {
      this.roles = data;
    })
    this.modalTitle = "Add New User";
    this.openModal(content);
  }

  openEditUser(content, element){
    if(element.userId === 1){
      swal('Not Allowed', 'This user cannot be modified', 'warning');
      return false;
    }
    this.userId = element.userId;
    this.username = element.username;
    this.roleId = element.roleId;
    this.userRoleId = element.userRoleId;
    this.displayName = element.displayName;
    this.isActive = element.isActive;
    this.email = element.email;
    this.editMode = true;
    this.roleService.getAllRoles().subscribe((data: RolesModel[]) => {
      this.roles = data;
    })
    this.modalTitle = "Edit User";
    this.openModal(content);
  }

  openEditRole(content, element){
    if(element.userId === 1){
      swal('Not Allowed', 'This user cannot be modified', 'warning');
      return false;
    }
    this.userId = element.userId;
    this.username = element.username;
    this.roleId = element.roleId;
    this.userRoleId = element.userRoleId;
    this.editMode = true;
    this.roleService.getAllRoles().subscribe((data: RolesModel[]) => {
      this.roles = data;
    })
    this.openModal(content);
  }
  
  filterForeCasts(event) {
    this.roleId = event;
  }

  saveUser(){
    if(this.password !== this.password2){
      swal('Error', 'Password confirmation does not match', 'error');
    } else {
      let item = new UsersModel;
      item.username = this.username;
      item.displayName = this.displayName;
      item.password = this.password;
      item.isActive = 0;
      item.insertUserId = +localStorage.getItem('userId');
      item.email = this.email;
      // console.log(item);
      this.service.addUser(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAllUsers();
      })
      this.modalService.dismissAll('Saved');
    }
  }

  updateUser(){
    if(this.isActive && this.roleId === 0){
      swal('Error', 'A role must be assigned before activating user', 'error');
    } else {
      let item = new UsersModel;
      item.userId = this.userId;
      item.username = this.username;
      item.displayName = this.displayName;
      item.email = this.email;
      item.updateUserId = +localStorage.getItem('userId');
      item.isActive = +this.isActive ;
      
      this.service.updateUser(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAllUsers();
      })
    }
    this.modalService.dismissAll('Saved');
  }

  openResetPassword(content, element){
    if(element.userId === 1){
      swal('Not Allowed', 'This user cannot be modified', 'warning');
      return false;
    }
    this.username = element.username;
    this.password = '';
    this.openModal(content);
  }

  resetPassword(){
    console.log('About to reset the user ' + this.username + ' with password: ' + this.password)
    this.modalService.dismissAll('Password reset');
    this.username = '';
    this.password = '';
  }
  
  saveRole(){
    let item = new UserRolesModel;
    item.roleId = this.roleId;
    item.userId = this.userId;
    if(this.userRoleId > 0){
      item.userRoleId = this.userRoleId
      this.service.updateRole(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAllUsers();
      })
    } else {
      this.service.assignRole(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAllUsers();
      })
    }
    this.modalService.dismissAll('Saved');
  }

  openModal(content){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeModal(content){
    this.modalService.dismissAll(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }

  
}
