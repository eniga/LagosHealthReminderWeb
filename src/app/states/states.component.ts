import { Component, OnInit, ViewChild } from '@angular/core';
import { StatesModel } from '../models/StatesModel';
import { ResponseModel } from '../models/ResponseModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  // Array of States
  displayedColumns: string[] = ['state', 'insertUser', 'insertDate','actions'];
  dataSource: MatTableDataSource<StatesModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  states: StatesModel[] = [];
  filterValue: string;
  total: number;
  isLoading = true;

  // Values for modal
  stateId: number;
  state: string;

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  constructor(private service: StatesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe((data: StatesModel[]) =>{
      this.states = data;
      this.dataSource = new MatTableDataSource(this.states);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updateTotal();
    })
  }

  addItem(){
    let item = new StatesModel;
    item.state = this.state;
    item.insertUserId = +localStorage.getItem('userId');
    this.service.add(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    })
    this.closeModal('Added');
  }

  updateItem(){
    let item = new StatesModel;
    item.stateId = this.stateId;
    item.state = this.state;
    item.updateUserId = +localStorage.getItem('userId');
    this.service.update(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAll();
    })
    this.closeModal('Added');
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
    this.isLoading = false;
  }

  // Method to export to Excel
  exportTable(){

  }

  openAddModal(content){
    this.stateId = 0;
    this.state = '';
    this.modalTitle = "Add New State";
    this.editMode = false;
    this.openModal(content);
  }

  openEditModal(content, element){
    this.stateId = element.stateId;
    this.state = element.state;
    this.modalTitle = "Edit State";
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
    this.stateId = event;
  }
}
