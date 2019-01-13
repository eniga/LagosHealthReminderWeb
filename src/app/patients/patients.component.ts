import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PatientsModel } from '../models/PatientsModel';
import { PatientsService } from '../services/patients.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MedicalCentresModel } from '../models/MedicalCentreModel';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert'; 
import { ResponseModel } from '../models/ResponseModel';
import { MedicalCentresService } from '../services/medical-centres.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  // Array of Patients
  patients: PatientsModel[] = [];

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'phone', 'altPhone', 'dob', 'settlement', 'ward', 'insertDate', 'insertUser', 'phc', 'actions'];
  dataSource: MatTableDataSource<PatientsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  filterValue: string;
  total: number;
  isLoading = true;

  patientId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  altPhone: string;
  email: string;
  dob: Date;
  settlementId: number;
  settlement: string;
  settlements: MedicalCentresModel[];

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;
  

  constructor(private service: PatientsService, private settlementService: MedicalCentresService, private modalService: NgbModal) { }

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
    //const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.patients);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Patients.xlsx');
  }

  addItem(){
    let item = new PatientsModel;
    item.insertUserId = +localStorage.getItem('userId');
    console.log(item);
    this.closeModal('Added');
  }

  updateItem(){
    let item = new PatientsModel;
    
    item.updateUserId = +localStorage.getItem('userId');
    this.service.updatePatient(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAllPatients();
    })
    this.closeModal('Updated');
  }

  openAddModal(content){
    this.patientId = 0;
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.phone = '';
    this.email = '';
    this.dob = new Date;
    this.settlementId = 0;
    this.modalTitle = "Add New Patient";
    this.editMode = false;
    this.openModal(content);
  }

  openEditModal(content, element){
    this.patientId = element.patientId;
    this.firstName = element.firstName;
    this.middleName = element.middleName;
    this.lastName = element.lastName;
    this.phone = element.phone;
    this.email = element.email;
    this.dob = element.dob;
    this.settlementId = element.settlementId;
    this.modalTitle = "Edit Patient";
    this.editMode = true;
    this.openModal(content);
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

  filterForeCasts(event) {
    this.settlementId = event;
  }

}
