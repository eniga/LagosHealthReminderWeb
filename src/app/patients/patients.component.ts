import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientsModel } from '../models/PatientsModel';
import { PatientsService } from '../services/patients.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  // Array of Patients
  patients: PatientsModel[] = [];

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'phone', 'email', 'dob', 'settlement', 'insertDate', 'insertUser', 'actions'];
  dataSource: MatTableDataSource<PatientsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;
  total: number;
  isLoading = true;

  constructor(private service: PatientsService) { }

  ngOnInit() {
    this.getAllPatients();
  }

  getAllPatients(){
    this.service.getAllPatients().subscribe((data: PatientsModel[]) => {
      this.patients = data;
      this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updateTotal();
    });
  }

  addPatient(){
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
  removePatient(element, filterValue){
    // Get the index of the element
    let i = this.patients.findIndex(x => x.patientId == element.patientId);

    // Remove element from the countries array
    this.patients.splice(i, 1);

    // Rebind dataSource data array to countries array
    this.dataSource = new MatTableDataSource(this.patients);
    
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
  selectedPatient(element){
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
