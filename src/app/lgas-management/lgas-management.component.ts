import { Component, OnInit, ViewChild } from '@angular/core';
import { LgasManagementService } from '../services/lgas-management.service';
import { LgaModel } from '../models/LgaModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert';

@Component({
  selector: 'app-lgas-management',
  templateUrl: './lgas-management.component.html',
  styleUrls: ['./lgas-management.component.scss']
})
export class LgasManagementComponent implements OnInit {

  lgas: LgaModel[] = [];
  displayedColumns: string[] = ['lga', 'state', 'insertUser', 'insertDate', 'actions'];
  dataSource: MatTableDataSource<LgaModel>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterValue: string;
  total: number;
  isLoading = true;

  // Values for modal
  lgaId: number;
  lga: string;
  stateId: number;
  state: string;
  insertUserId = localStorage.getItem('userId');
  updateUserId = localStorage.getItem('userId');

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  constructor(private service: LgasManagementService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAllLgas().subscribe((data: LgaModel[]) => {
      this.lgas = data;
      this.dataSource = new MatTableDataSource(this.lgas);
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

  // Method to remove an element from the array
  removeItem(element){
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
        this.service.deleteLga(element.lgaId).subscribe((data: ResponseModel) => {
          swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
          this.getAll();
        })
      }
    });
  }

  // Method to return selected centre details
  selectedItem(element){
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

  // Method to Add new Centre
  addItem(){
    let item = new LgaModel;
    item.lga = this.lga;
    item.stateId = this.stateId;
    item.insertUserId = +this.insertUserId;
    this.service.newLga(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    });
    this.closeModal('Added');
  }

  updateItem(){
    let item = new LgaModel;
    item.lgaId = this.lgaId;
    item.lga = this.lga;
    item.stateId = this.stateId;
    item.updateUserId = +this.updateUserId;
    this.service.updateLga(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    })
    this.closeModal('Updated');
  }

  openAddModal(content){
    this.lga = '';
    this.stateId = 1;
    this.state = 'Lagos';
    this.modalTitle = 'Add New LGA';
    this.editMode = false;
    this.openModal(content);
  }

  openEditModal(content, element){
    this.lgaId = element.lgaId;
    this.lga = element.lga;
    this.stateId = element.stateId;
    this.modalTitle = 'Edit LGA';
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


}
