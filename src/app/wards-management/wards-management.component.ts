import { Component, OnInit, ViewChild } from '@angular/core';
import { WardsManagementService } from '../services/wards-management.service';
import { WardsModel } from '../models/WardsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatCard } from '@angular/material';

@Component({
  selector: 'app-wards-management',
  templateUrl: './wards-management.component.html',
  styleUrls: ['./wards-management.component.scss']
})
export class WardsManagementComponent implements OnInit {
  wards: WardsModel[] = [];

  // Array of Wards
  displayedColumns: string[] = ['ward', 'lga', 'state', 'insertDate', 'insertUser', 'actions'];
  dataSource: MatTableDataSource<WardsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;
  total: number;
  isLoading = true;

  constructor(private service: WardsManagementService) { }

  ngOnInit() {
    this.getAllWards();
  }

  getAllWards(){
    this.service.getAllWards().subscribe((data: WardsModel[]) => {
      this.wards = data;
      this.dataSource = new MatTableDataSource(this.wards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updateTotal();
    });
  }

  addWard(){
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
  removeWard(element, filterValue){
    // Get the index of the element
    let i = this.wards.findIndex(x => x.wardId == element.wardId);

    // Remove element from the countries array
    this.wards.splice(i, 1);

    // Rebind dataSource data array to countries array
    this.dataSource = new MatTableDataSource(this.wards);
    
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
  selectedWard(element){
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

}
