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
  closeResult: string;
  userRoleId: number;
  displayName: string;
  editMode = false;
  isActive = false;
  email: string;


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

  addUser(){
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
  removeUser(element, filterValue){
    // Get the index of the element
    let i = this.users.findIndex(x => x.userId == element.userId);

    // Remove element from the countries array
    this.users.splice(i, 1);

    // Rebind dataSource data array to countries array
    this.dataSource = new MatTableDataSource(this.users);
    
    // Check if the data table is filtered, if filtered then filter the returned data again
    if(filterValue != undefined){
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // Update the number of total available records in the array
    this.updateTotal();

    // Re-initialize pagination and sorting
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  openNewUser(content){
    this.userId = 0;
    this.username = '';
    this.roleId = 0;
    this.userRoleId = 0;
    this.displayName = '';
    this.isActive = false;
    this.email = '';

    this.roleService.getAllRoles().subscribe((data: RolesModel[]) => {
      this.roles = data;
    })
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditUser(content, element){
    this.userId = element.userId;
    this.username = element.username;
    this.roleId = element.roleId;
    this.userRoleId = element.userRoleId;
    this.displayName = element.displayName;
    this.isActive = element.isActive;
    this.email = element.email;

    this.roleService.getAllRoles().subscribe((data: RolesModel[]) => {
      this.roles = data;
    })
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditRole(content, element){
    this.userId = element.userId;
    this.username = element.username;
    this.roleId = element.roleId;
    this.userRoleId = element.userRoleId;

    this.roleService.getAllRoles().subscribe((data: RolesModel[]) => {
      this.roles = data;
    })
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  filterForeCasts(event) {
    this.roleId = event;
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
  
}
