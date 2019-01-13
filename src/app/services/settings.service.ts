import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsModel } from '../models/SettingsModel';
import { appsettings } from '../appsettings';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<SettingsModel[]>(appsettings.api_url + 'settings');
  }

  add(request: SettingsModel){
    return this.http.post<ResponseModel>(appsettings.api_url + 'settings', request);
  }

  update(request: SettingsModel){
    return this.http.put<ResponseModel>(appsettings.api_url + 'settings', request);
  }

  delete(settingsId: number){
    return this.http.delete<ResponseModel>(appsettings.api_url + 'settings/' + settingsId);
  }
}
