import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MedicalCentresModel } from '../models/MedicalCentreModel';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MedicalCentresService } from '../services/medical-centres.service';

@Component({
  selector: 'app-medical-centres',
  templateUrl: './medical-centres.component.html',
  styleUrls: ['./medical-centres.component.scss']
})
export class MedicalCentresComponent implements OnInit {
  // Array of Medical Centres
  displayedColumns: string[] = ['settlement', 'ward', 'lga', 'state', 'insertDate', 'insertUser', 'actions'];
  dataSource: MatTableDataSource<MedicalCentresModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  centres: MedicalCentresModel[] = [];
  filterValue: string;
  total: number;
  isLoading = true;

  constructor(private service: MedicalCentresService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.service.getAll().subscribe((data: MedicalCentresModel[]) =>{
      this.centres = data;
      this.dataSource = new MatTableDataSource(this.centres);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updateTotal();
    })
  }

  addCentre(){
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
  removeCentre(element, filterValue){
    // Get the index of the element
    let i = this.centres.findIndex(x => x.settlement == element.settlement);

    // Remove element from the countries array
    this.centres.splice(i, 1);

    // Rebind dataSource data array to countries array
    this.dataSource = new MatTableDataSource(this.centres);
    
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
  selectedCentre(element){
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
