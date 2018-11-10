import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { ServiceTypesModel } from '../models/ServicesModel';
import { MedicalServicesService } from '../services/medical-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-medical-services',
  templateUrl: './medical-services.component.html',
  styleUrls: ['./medical-services.component.scss']
})
export class MedicalServicesComponent implements OnInit {

  // Array of Medical Centres
  displayedColumns: string[] = ['serviceTypeName', 'insertDate', 'insertUser', 'smsMessage', 'actions'];
  dataSource: MatTableDataSource<ServiceTypesModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  types: ServiceTypesModel[] = [];
  filterValue: string;
  total: number;
  isLoading = true;

  // Values for modal
  serviceTypeId: number;
  serviceTypeName: string;
  insertUserId: number;
  insertUser: string;
  updateUserId: number;
  updateUser: string;

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  defaultMessage: string = 'Dear [firstname], your appointment is scheduled for '
  smsMessage: string;

  constructor(private service: MedicalServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.service.getAllTypes().subscribe((data: ServiceTypesModel[]) => {
      this.types = data;
      this.dataSource = new MatTableDataSource(this.types);
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
      swal({
        title: 'Are you sure?',
        icon: 'warning',
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: {
            text: 'Delete'
          }
        }
      }).then((value) => {
        if(value){
          this.service.deleteType(element.serviceTypeId).subscribe((data: ResponseModel) => {
            swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
            this.getAll();
          })
        }
      });
    }
  
    // Method to return selected centre details
    selectedCentre(element){
      console.log(element);
    }

    viewServices(element){
      this.router.navigate(['kinds/' + element.serviceTypeId]);
    }
  
    // Method to update the number of total available records in the array
    updateTotal(){
      this.total = this.dataSource.filteredData.length == undefined ? this.dataSource.data.length : this.dataSource.filteredData.length;
      this.isLoading = false;
    }
  
    // Method to export to Excel
    exportTable(){
  
    }
  
    addItem(){
      let item = new ServiceTypesModel;
      item.serviceTypeName = this.serviceTypeName;
      item.insertUserId = +localStorage.getItem('userId');
      this.service.newType(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAll();
      })
      this.closeModal('Added');
    }
  
    updateItem(){
      let item = new ServiceTypesModel;
      item.serviceTypeId = this.serviceTypeId;
      item.serviceTypeName = this.serviceTypeName;
      item.updateUserId = +localStorage.getItem('userId');
      this.service.updateType(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAll();
      })
      this.closeModal('Added');
    }
  
    openAddModal(content){
      this.serviceTypeId = 0;
      this.serviceTypeName = '';
      this.modalTitle = "Add New Service Type";
      this.editMode = false;
      this.openModal(content);
    }
  
    openEditModal(content, element){
      this.serviceTypeId = element.serviceTypeId;
      this.serviceTypeName = element.serviceTypeName;
      this.modalTitle = "Edit Service Type";
      this.editMode = true;
      this.smsMessage = element.smsMessage ? element.smsMessage : 'Sample: Dear [firstname], your ' + element.serviceTypeName + ' appointment has been scheduled for tomorrow.';
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
    }
  
    updateMessage(){
      let item = new ServiceTypesModel;
      item.serviceTypeId = this.serviceTypeId;
      item.smsMessage = this.smsMessage;
      item.updateUserId = +localStorage.getItem('userId');
      this.service.updateTypeSMSMessage(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAll();
        this.smsMessage = '';
      })
      this.closeModal('Added');
    }
}
