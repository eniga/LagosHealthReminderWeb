import { Injectable } from '@angular/core';
import { MedicalCentresModel } from '../models/MedicalCentreModel';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class MedicalCentresService {

  centres: MedicalCentresModel[] = [];

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<MedicalCentresModel[]>(appsettings.api_url + 'settlements')
  }

  newItem(settlement: MedicalCentresModel){
    return this.http.post(appsettings.api_url + 'settlements', settlement);
  }

  updateItem(settlement: MedicalCentresModel){
    return this.http.put(appsettings.api_url + 'settlements', settlement);
  }

  deleteItem(settlementId: number){
    return this.http.delete(appsettings.api_url + 'settlements/' + settlementId);
  }
}
