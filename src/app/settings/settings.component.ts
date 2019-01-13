import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsModel } from '../models/SettingsModel';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // Array of Medical Centres
  displayedColumns: string[] = ['name','value', 'actions'];
  dataSource: MatTableDataSource<SettingsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  settings: SettingsModel[] = [];
  filterValue: string;
  total: number;
  isLoading = true;

  // Values for modal
  settingsId: number;
  name: string;
  value: string;

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  constructor(private service: SettingsService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute) {   }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe((data: SettingsModel[]) => {
      this.settings = data;
      this.dataSource = new MatTableDataSource(this.settings);
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
        this.service.delete(element.settingsId).subscribe((data: ResponseModel) => {
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
    if(this.name.length < 1){
      swal('Error', 'Kindly fill in a Name', 'error');
      return false;
    }
    let item = new SettingsModel;
    item.name = this.name;
    item.value = this.value;
    this.service.add(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    })
    this.closeModal('Added');
  }

  updateItem(){
    let item = new SettingsModel;
    item.settingsId = this.settingsId
    item.name = this.name;
    item.value = this.value;
    this.service.update(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    })
    this.closeModal('Added');
  }

  openAddModal(content){
    this.settingsId = 0;
    this.name = '';
    this.value = '';
    this.modalTitle = "Add New Setting";
    this.editMode = false;
    this.openModal(content);
  }

  openEditModal(content, element){
    this.settingsId = element.settingsId;
    this.name = element.name;
    this.value = element.value;
    this.modalTitle = "Edit Setting";
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
    this.settingsId = event;
  }

}
