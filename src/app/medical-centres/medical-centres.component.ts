import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MedicalCentresModel } from '../models/MedicalCentreModel';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MedicalCentresService } from '../services/medical-centres.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WardsModel } from '../models/WardsModel';
import { WardsManagementService } from '../services/wards-management.service';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 

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

  // Values for modal
  settlementId: number;
  settlement: string;
  wardId: number;
  ward: string;
  wards: WardsModel[];

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  constructor(private service: MedicalCentresService, private wardService: WardsManagementService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll()
    this.getAllWards();
  }

  getAllWards(){
    this.wardService.getAllWards().subscribe((data: WardsModel[]) => {
      this.wards = data;
    })
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
        this.service.deleteItem(element.settlementId).subscribe((data: ResponseModel) => {
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

  // Method to update the number of total available records in the array
  updateTotal(){
    this.total = this.dataSource.filteredData.length == undefined ? this.dataSource.data.length : this.dataSource.filteredData.length;
    this.isLoading = false;
  }

  // Method to export to Excel
  exportTable(){

  }

  addItem(){
    let item = new MedicalCentresModel;
    item.settlement = this.settlement;
    item.wardId = this.wardId;
    item.insertUserId = +localStorage.getItem('userId');
    this.service.newItem(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    })
    this.closeModal('Added');
  }

  updateItem(){
    let item = new MedicalCentresModel;
    item.settlementId = this.settlementId;
    item.settlement = this.settlement;
    item.wardId = this.wardId;
    item.updateUserId = +localStorage.getItem('userId');
    this.service.updateItem(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    })
    this.closeModal('Added');
  }

  openAddModal(content){
    this.settlementId = 0;
    this.settlement = '';
    this.ward = '';
    this.wardId = 0;
    this.modalTitle = "Add New Settlement";
    this.editMode = false;
    this.openModal(content);
  }

  openEditModal(content, element){
    this.settlementId = element.settlementId;
    this.settlement = element.settlement;
    this.wardId = element.wardId;
    this.ward = element.ward;
    this.modalTitle = "Edit Settlement";
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
    this.wardId = event;
  }
}
