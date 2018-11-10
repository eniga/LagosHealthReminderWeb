import { Injectable } from '@angular/core';
import { PHCModel } from '../models/PHCModel';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class PhcService {

  centres: PHCModel[] = [];

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<PHCModel[]>(appsettings.api_url + 'phc')
  }

  newItem(settlement: PHCModel){
    return this.http.post(appsettings.api_url + 'phc', settlement);
  }

  updateItem(settlement: PHCModel){
    return this.http.put(appsettings.api_url + 'phc', settlement);
  }

  deleteItem(settlementId: number){
    return this.http.delete(appsettings.api_url + 'phc/' + settlementId);
  }
}
