import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';
import { ServiceKindsModel, ServiceTypesModel, TypesModel } from '../models/ServicesModel';

@Injectable({
  providedIn: 'root'
})
export class MedicalServicesService {

  constructor(private http: HttpClient) { }

  getAllKinds(serviceTypeId: number){
    return this.http.get<ServiceKindsModel[]>(appsettings.api_url + 'ServiceKinds/' + serviceTypeId);
  }

  newKind(settlement: ServiceKindsModel){
    return this.http.post(appsettings.api_url + 'ServiceKinds', settlement);
  }

  updateKind(settlement: ServiceKindsModel){
    return this.http.put(appsettings.api_url + 'ServiceKinds', settlement);
  }

  deleteKind(settlementId: number){
    return this.http.delete(appsettings.api_url + 'ServiceKinds/' + settlementId);
  }

  getAllTypes(){
    return this.http.get<ServiceTypesModel[]>(appsettings.api_url + 'ServiceTypes')
  }

  newType(serviceType: ServiceTypesModel){
    return this.http.post(appsettings.api_url + 'ServiceTypes', serviceType);
  }

  updateType(serviceType: ServiceTypesModel){
    return this.http.put(appsettings.api_url + 'ServiceTypes', serviceType);
  }

  deleteType(serviceTypeId: number){
    return this.http.delete(appsettings.api_url + 'ServiceTypes/' + serviceTypeId);
  }

  updateTypeSMSMessage(serviceType: ServiceTypesModel){
    return this.http.put(appsettings.api_url + 'ServiceTypes/smsmessage', serviceType);
  }

  getTypes(){
    return this.http.get<TypesModel[]>(appsettings.api_url + 'ServiceKinds/types')
  }
}
