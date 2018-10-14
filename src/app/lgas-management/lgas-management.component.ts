import { Component, OnInit, ViewChild } from '@angular/core';
import { LgasManagementService } from '../services/lgas-management.service';
import { LgaModel } from '../models/LgaModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  lga: string;
  state: string;

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  constructor(private service: LgasManagementService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAllUsers().subscribe((data: LgaModel[]) => {
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
  removeItem(element, filterValue){
    // Get the index of the element
    let i = this.lgas.findIndex(x => x.lga == element.lga);

    // Remove element from the countries array
    this.lgas.splice(i, 1);

    // Rebind dataSource data array to countries array
    this.dataSource = new MatTableDataSource(this.lgas);
    
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
    this.closeModal('Added');
  }

  openAddModal(content){
    this.lga = '';
    this.state = 'Lagos'
    this.modalTitle = 'Add New LGA';
    this.openModal(content);
  }

  openEditModal(content, element){
    this.lga = element.lga;
    this.state = element.state;
    this.modalTitle = 'Edit LGA';
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
