import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from '../models/ResponseModel';
import swal from 'sweetalert'; 
import { ServiceTypesModel, ServiceKindsModel, TypesModel } from '../models/ServicesModel';
import { MedicalServicesService } from '../services/medical-services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-kinds',
  templateUrl: './service-kinds.component.html',
  styleUrls: ['./service-kinds.component.scss']
})
export class ServiceKindsComponent implements OnInit {
  // Array of Medical Centres
  displayedColumns: string[] = ['serviceKindName','serviceType', 'insertDate', 'insertUser', 'type', 'duration', 'actions'];
  dataSource: MatTableDataSource<ServiceKindsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  serviceTypes: ServiceTypesModel[] = [];
  serviceKinds: ServiceKindsModel[] = [];
  types: TypesModel[] = [];
  filterValue: string;
  total: number;
  isLoading = true;

  // Values for modal
  serviceKindId: number;
  serviceKindName: string;
  serviceTypeId: number;
  serviceType: string;
  insertUserId: number;
  insertUser: string;
  updateUserId: number;
  updateUser: string;
  typeId: number;
  type: string;
  duration: number;

  // For Modal
  closeResult: string;
  editMode = false;
  modalTitle: string;

  constructor(private service: MedicalServicesService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(res => this.serviceTypeId = res.id);
   }

  ngOnInit() {
    this.getAllKinds();
    this.getServiceType();
    this.getTypes();
  }

  getTypes(){
    this.service.getTypes().subscribe((data: TypesModel[]) => {
      if(data.length > 0){
        this.types = data;
      }
    })
  }

  getServiceType(){
    this.service.getAllTypes().subscribe((data: ServiceTypesModel[]) => {
      if(data.length > 0){
        let typeData = data.filter(x => +x.serviceTypeId === +this.serviceTypeId);
        if(typeData.length > 0)
        {
          this.serviceType = typeData[0].serviceTypeName;
        }
      }
    })
  }

  getAllKinds(){
    this.service.getAllKinds(this.serviceTypeId).subscribe((data: ServiceKindsModel[]) => {
      this.serviceKinds = data;
      this.dataSource = new MatTableDataSource(this.serviceKinds);
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
          this.service.deleteKind(element.serviceKindId).subscribe((data: ResponseModel) => {
            swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
            this.getAllKinds();
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
      if(this.serviceKindName.length < 1){
        swal('Error', 'Kindly fill in a Service Name', 'error');
        return false;
      }
      let item = new ServiceKindsModel;
      item.serviceKindName = this.serviceKindName;
      item.serviceTypeId = this.serviceTypeId;
      item.typeId = this.typeId;
      item.type = this.type;
      item.duration = this.duration;
      item.insertUserId = +localStorage.getItem('userId');
      this.service.newKind(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAllKinds();
      })
      this.closeModal('Added');
    }
  
    updateItem(){
      let item = new ServiceKindsModel;
      item.serviceKindId = this.serviceKindId;
      item.serviceKindName = this.serviceKindName;
      item.serviceTypeId = this.serviceTypeId;
      item.typeId = this.typeId;
      item.type = this.type;
      item.duration = this.duration;
      item.updateUserId = +localStorage.getItem('userId');
      this.service.updateKind(item).subscribe((data: ResponseModel) => {
        swal(data.status? 'Success' : 'Error', data.statusMessage, data.status? 'success' : 'error');
        this.getAllKinds();
      })
      this.closeModal('Added');
    }
  
    openAddModal(content){
      this.serviceKindId = 0;
      this.serviceKindName = '';
      this.typeId = 0;
      this.type = '';
      this.duration = 0;
      this.modalTitle = "Add New Service Type";
      this.editMode = false;
      this.openModal(content);
    }
  
    openEditModal(content, element){
      this.serviceKindId = element.serviceKindId;
      this.serviceKindName = element.serviceKindName;
      this.typeId = element.typeId;
      this.type = element.type;
      this.duration = element.duration;
      this.modalTitle = "Edit Service Type";
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
      this.typeId = event;
    }
  

}
