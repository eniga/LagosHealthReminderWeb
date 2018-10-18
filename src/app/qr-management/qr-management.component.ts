import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { QrCodeModel, QrCodeStatus } from '../models/QrCodeModel';


@Component({
  selector: 'app-qr-management',
  templateUrl: './qr-management.component.html',
  styleUrls: ['./qr-management.component.scss']
})
export class QrManagementComponent implements OnInit {
    // Array of Users
    displayedColumns: string[] = ['qrCode', 'patientName', 'patientId', 'status', 'insertDate', 'insertUser','actions'];
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
    status: QrCodeStatus;
  
    // For Modal
    closeResult: string;
    editMode = false;
    modalTitle: string;
  
  

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

}
