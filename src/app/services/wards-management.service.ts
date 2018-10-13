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
}
