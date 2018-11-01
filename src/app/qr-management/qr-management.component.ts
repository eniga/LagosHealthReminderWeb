import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { QrCodeModel, QrCodeStatus, QrCodeRequestModel } from '../models/QrCodeModel';
import { PatientsService } from '../services/patients.service';
import { QrManagementService } from '../services/qr-management.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qr-management',
  templateUrl: './qr-management.component.html',
  styleUrls: ['./qr-management.component.scss']
})
export class QrManagementComponent implements OnInit {
    // Array of Users
    displayedColumns: string[] = ['qrCode', 'patientName', 'patientId', 'printStatus', 'insertDate', 'insertUser','actions'];
    dataSource: MatTableDataSource<QrCodeModel>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    filterValue: string;
    total: number;
    qrcodes: QrCodeModel[] = [];
    isLoading = true;
  
    qrCodeId: number;
    qrCode: string = '';
    qrCodeImage: number;
    patientId: number;
    insertUserId: number;
    insertUser: string;
    patientName: string;
    updateUserId: number;
    updateUser: string;
    printStatus: QrCodeStatus;
  
    // For Modal
    closeResult: string;
    editMode = false;
    modalTitle: string;
    numberOfCodes: number;
  
  

  constructor(private modalService: NgbModal, private service: PatientsService, private qrService: QrManagementService, private router: Router) { }

  ngOnInit() {
    this.getAllCodes();
  }

  getAllCodes(){
    this.qrService.getAllCodes().subscribe((data: QrCodeModel[]) => {
      this.qrcodes = data;
      this.dataSource = new MatTableDataSource(this.qrcodes);
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

  // Method to update the number of total available records in the array
  updateTotal(){
    this.total = this.dataSource.filteredData.length == undefined ? this.dataSource.data.length : this.dataSource.filteredData.length;
    // console.log(this.total);
    this.isLoading = false;
  }

  generateCode(){
    let request = new QrCodeRequestModel;
    request.numberOfCodes = this.numberOfCodes;
    request.insertUserId = +localStorage.getItem('userId');
    this.qrService.generateCode(request).subscribe((data: QrCodeModel[]) => {
      if(data.length > 0){
        // Redirect to unprinted
        this.router.navigate(['/unprinted']);
      } else {
        swal('Error', 'System malfunction', 'error');
      }
    })
    this.closeModal('Closed');
  }

  openGenerate(content){
    this.numberOfCodes = 0;
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

  
}
