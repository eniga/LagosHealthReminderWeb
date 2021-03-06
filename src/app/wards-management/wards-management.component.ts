import { Component, OnInit, ViewChild } from '@angular/core';
import { WardsManagementService } from '../services/wards-management.service';
import { WardsModel } from '../models/WardsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatCard } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LgaModel } from '../models/LgaModel';
import { LgasManagementService } from '../services/lgas-management.service';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 

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

    // Values for modal
    wardId: number;
    ward: string;
    lga: string;
    lgaId: number;
    lgas: LgaModel[];
  
    // For Modal
    closeResult: string;
    editMode = false;
    modalTitle: string;
  

  constructor(private service: WardsManagementService, private lgaService: LgasManagementService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllWards();
    this.loadLga();
  }

  loadLga(){
    this.lgaService.getAllLgas().subscribe((data: LgaModel[]) => {
      this.lgas = data.sort((a,b) => {
        if(a.lga < b.lga) { return -1;}
        if(a.lga > b.lga) { return 1; }
        return 0;
      });
    })
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
        this.service.removeWard(element.wardId).subscribe((data: ResponseModel) => {
          swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
          this.getAllWards();
        })
      }
    });
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

  addItem(){
    let item = new WardsModel;
    item.ward = this.ward;
    item.lgaId = this.lgaId;
    item.insertUserId = +localStorage.getItem('userId');
    this.service.newWard(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAllWards();
    });
    this.closeModal('Added');
  }

  updateItem(){
    let item = new WardsModel;
    item.wardId = this.wardId;
    item.ward = this.ward;
    item.lgaId = this.lgaId;
    item.updateUserId = +localStorage.getItem('userId');
    this.service.updateWard(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAllWards();
    })
    this.closeModal('Updated');
  }

  openAddModal(content){
    this.ward = '';
    this.lga = '';
    this.lgaId = 0;
    this.modalTitle = "Add New Ward";
    this.editMode = false;
    this.openModal(content);
  }

  openEditModal(content, element){
    this.wardId = element.wardId;
    this.ward = element.ward;
    this.lga = element.lga;
    this.lgaId = element.lgaId;
    this.modalTitle = "Edit Ward";
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
    this.lgaId = event;
  }


}
