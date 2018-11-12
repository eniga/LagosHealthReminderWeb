import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { MatTableDataSource, MatPaginator, MatSort, MatCard } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LgaModel } from '../models/LgaModel';
import { LgasManagementService } from '../services/lgas-management.service';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { CampaignModel } from '../models/CampaignModel';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  campaign: CampaignModel[] = [];

  // Array of Wards
  displayedColumns: string[] = ['message', 'lga', 'insertDate', 'insertUser', 'status', 'actions'];
  dataSource: MatTableDataSource<CampaignModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;
  total: number;
  isLoading = true;

    // Values for modal
    campaignId: number;
    message: string;
    lga: string;
    lgaId: number;
    lgas: LgaModel[];
  
    // For Modal
    closeResult: string;
    editMode = false;
    modalTitle: string;

  constructor(private service: CampaignService, private lgaService: LgasManagementService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadLga();
    this.getAllMessages();
  }

  loadLga(){
    this.lgaService.getAllLgas().subscribe((data: LgaModel[]) => {
      this.lgas = data;
    })
  }

  getAllMessages(){
    this.service.getAllMessages().subscribe((data: CampaignModel[]) => {
      this.campaign = data;
      this.dataSource = new MatTableDataSource(this.campaign);
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

  // Method to export to Excel
  exportTable(){

  }

  addItem(){
    let item = new CampaignModel();
    item.lgaId = this.lgaId;
    item.insertUserId = +localStorage.getItem('userId');
    item.message = this.message;
    this.service.newMessage(item).subscribe((data: ResponseModel) => {
      swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
      this.getAllMessages();
    });
    this.closeModal('Saved');
  }

  openAddModal(content){
    this.message = '';
    this.lga = '';
    this.lgaId = 0;
    this.modalTitle = "Send New Campaign Message";
    this.editMode = false;
    this.openModal(content);
  }

  openEditModal(content, element){
    this.campaignId = element.campaignId;
    this.message = element.message;
    this.lga = element.lga;
    this.lgaId = element.lgaId;
    this.editMode = true;
    this.modalTitle = "View Campaign Message";
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
