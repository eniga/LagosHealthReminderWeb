import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersModel } from '../models/UsersModel';
import { UserManagementService } from '../services/user-management.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  // Array of Users
  displayedColumns: string[] = ['username', 'displayName', 'email', 'isActive', 'insertDate', 'insertUser', 'actions'];
  dataSource: MatTableDataSource<UsersModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;
  total: number;
  users: UsersModel[] = [];
  isLoading = true;

  constructor(private service: UserManagementService) { }

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


}
