import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatGridList} from '@angular/material/grid-list';
import { QrCodeModel, QrCodeStatus, QrCodeRequestModel } from '../models/QrCodeModel';
import { PatientsService } from '../services/patients.service';
import { QrManagementService } from '../services/qr-management.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-unprinted',
  templateUrl: './unprinted.component.html',
  styleUrls: ['./unprinted.component.scss']
})
export class UnprintedComponent implements OnInit {

  filterValue: string;
  total: number;
  qrcodes: QrCodeModel[] = [];
  isLoading = true;
  printed = false;

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



  constructor(private modalService: NgbModal, private service: PatientsService, private qrService: QrManagementService, private domSanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.getUnprinted();
  }

  getUnprinted(){
    this.qrService.getUnprinted().subscribe((data: QrCodeModel[])=> {
      this.qrcodes = data;
      this.isLoading = false;
    })
  }

  print(): void {
    // Open used in new window
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('data:text/html,', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          .thumbnail, img {
            display: block;
            width: 70px;
            height: 70px;
            float: left;
            page-break-inside: avoid;
          }
          @page {
            page-break-after: always;
            margin-top: 10px;
            margin-botton: 5px;
            margin-left: 30px;
            margin-right: 10px;
          }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.focus();
    popupWin.document.close();
    this.printed = true;
  }

  confirmPrinted(status: boolean){
    if(status){
      this.qrService.confirmPrinted().subscribe((data: Response) => {
        if(data.status){
          this.router.navigate(['/qr-management']);
        }
      });
    } else {
      this.printed = false;
    }
  }
}
