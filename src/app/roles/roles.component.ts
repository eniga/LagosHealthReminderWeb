import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesModel } from '../models/RolesModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RolesService } from '../services/roles.service';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  // Array of Roles
  roles: RolesModel[] = []
  roleName: string = "";
  roleId: number;

  displayedColumns: string[] = ['roleName', 'permissions', 'actions'];
  dataSource: MatTableDataSource<RolesModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;
  total: number;
  isLoading = true;

  closeResult: string;
  editMode = false;


  constructor(private service: RolesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.service.getAllRoles().subscribe((data: RolesModel[]) => {
      this.roles = data;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updateTotal();
    })
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
  removeItem(element, filterValue){
    // Get the index of the element
    let i = this.roles.findIndex(x => x.roleId == element.roleId);

    // Remove element from the countries array
    this.roles.splice(i, 1);

    // Rebind dataSource data array to countries array
    this.dataSource = new MatTableDataSource(this.roles);
    
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
  selectedItem(element){
    console.log(element);
  }

  // Method to update the number of total available records in the array
  updateTotal(){
    this.total = this.dataSource.filteredData.length == undefined ? this.dataSource.data.length : this.dataSource.filteredData.length;
    // console.log(this.total);
    this.isLoading = false;
  }

  // Method to export to Excel
  exportTable(){

  }

  openNew(content) {
    this.roleName = '';
    
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

openEdit(content, element){
  this.roleId = element.roleId;
  this.roleName = element.roleName;
  this.editMode = true;
  this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.editMode = false;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


save(){
  if(this.roleName.length > 3){
    let item = new RolesModel;
    item.roleName = this.roleName;
    this.service.addNewRole(this.roleName).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error')
      this.getAllItems();
    })
    
    this.modalService.dismissAll('Saved');
  } else if(this.roleName.length === 0) {
    swal('Error', 'No value entered', 'error');
  } else {
    swal('Error', 'value must meet minimum length of (3)', 'error');
  }
}

update(){
  if(this.roleName.length > 3){
    let item = new RolesModel;
    item.roleId = this.roleId;
    item.roleName = this.roleName
    this.service.updateRole(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error')
      this.getAllItems();
    })
    this.modalService.dismissAll('Updated');
  } else if(this.roleName.length === 0) {
    swal('Error', 'No value entered', 'error');
  } else {
    swal('Error', 'value must meet minimum length of (3)', 'error');
  }
}

private getDismissReason(reason: any): string {
  this.editMode = false;
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}

}
