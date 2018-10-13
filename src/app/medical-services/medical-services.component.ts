import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-services',
  templateUrl: './medical-services.component.html',
  styleUrls: ['./medical-services.component.scss']
})
export class MedicalServicesComponent implements OnInit {

  isLoading = true;
  serviceKinds: {Id: number, name: string}[] = [];
  serviceTypes = [{
    Id: 1,
    name: 'Immunization',
    kinds: [
      {Id: 1, name: 'At birth'},
      {Id: 2, name: '6 weeks'},
      {Id: 3, name: '10 weeks'},
      {Id: 4, name: '14 weeks'},
      {Id: 5, name: '6 months'},
      {Id: 6, name: '9 months'},
      {Id: 7, name: '12 months'}
    ]
  },
  {
    Id: 2,
    name: 'Antenatal Care',
    kinds: [
      {Id: 1, name: '1st'},
      {Id: 2, name: '2nd'},
      {Id: 3, name: '3rd'},
      {Id: 4, name: '4th'},
      {Id: 5, name: '5th'},
      {Id: 6, name: '6th'},
      {Id: 7, name: '7th'},
      {Id: 8, name: '8th'},
      {Id: 9, name: '9th'},
      {Id: 10, name: 'Other'}
    ]
  },
  {
    Id: 3,
    name: 'Postnatal Care',
    kinds: [
      {Id: 1, name: '1 day'},
      {Id: 2, name: '3 days'},
      {Id: 3, name: '7 days & after'},
      {Id: 4, name: 'Other'}
    ]
  },
  {
    Id: 4,
    name: 'Family Planning',
    kinds: [
      {Id: 1, name: 'Oral Pill'},
      {Id: 2, name: 'Injectable'},
      {Id: 3, name: 'Inplant'},
      {Id: 4, name: 'IUCD'},
      {Id: 5, name: 'Other'}
    ]
  }];
  serviceKind : {
    Id: number,
    name: string
  };
  serviceTypeId: number;
  serviceTypeName: string;
  serviceKindName: string;
  serviceKindId: number;
  typeId: number;
  kindId: number;

  serviceType : {
    Id: number,
    name: string,
    kinds: {Id: number, name: string}[]
  };
  resultKind : string;
  resultType : string;


  constructor() { }

  ngOnInit() {
  }

  loadKind(i){
    this.serviceKinds = this.serviceTypes[i].kinds;
  }

  addType() {
    this.serviceType = {
      Id: this.serviceTypeId,
      name: this.serviceTypeName,
      kinds: this.serviceKinds
    };

    let exists = this.serviceTypes.filter(x => x.Id == this.serviceTypeId);

    if(exists.length == 1){
      let i = this.serviceTypes.findIndex(x => x.Id == this.serviceTypeId);
      if(i > -1){
        this.serviceTypes[i] = this.serviceType;
      }
    }
    else {
      this.serviceTypes.push(this.serviceType);
    }
    this.serviceType = {'Id': 0,'name':'', 'kinds':[]}; 
    return false;
  }

  editType(i){
    this.typeId = i;
    this.serviceTypeId = this.serviceTypes[i].Id;
    this.serviceTypeName = this.serviceTypes[i].name;
    this.serviceKinds = this.serviceTypes[i].kinds;
  }

  removeType(i, Id) {
    this.serviceTypes.splice(i, 1);
  }

  addKind(){
    this.serviceKind = { Id: this.serviceKindId, name: this.serviceKindName };
    let exists = this.serviceKinds.filter(x => x.Id == this.serviceKindId);

    if(exists.length == 1){
      let i = this.serviceKinds.findIndex(x => x.Id == this.serviceKindId);
      if(i > -1){
        this.serviceKinds[i] = this.serviceKind;
      }
    }
    else {
      this.serviceKinds.push(this.serviceKind);
    }
    this.serviceKind = {Id: 0, name: ''};
    return false;
  }

  editKind(i){
    this.kindId = i;
    this.serviceKindId = this.serviceKinds[i].Id;
    this.serviceKindName = this.serviceKinds[i].name;
  }

  removeKind(i){
    this.serviceKinds.splice(i, 1);
  }

}
