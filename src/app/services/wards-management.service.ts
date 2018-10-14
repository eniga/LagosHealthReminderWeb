import { Injectable } from '@angular/core';
import { WardsModel } from '../models/WardsModel';
import { appsettings } from '../appsettings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WardsManagementService {

  constructor(private http: HttpClient) { }

  getAllWards() {
    return this.http.get<WardsModel[]>(appsettings.api_url + 'wards');
  }

  newWard(ward: WardsModel){
    return this.http.post(appsettings.api_url + 'wards', ward);
  }

  updateWard(ward: WardsModel){
    return this.http.put(appsettings.api_url + 'wards', ward);
  }

  removeWard(wardId: number){
    return this.http.delete(appsettings.api_url + 'wards/' + wardId);
  }
}
