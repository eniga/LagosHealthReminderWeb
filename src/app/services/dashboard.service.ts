import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';
import { DashboardModel, SMSDashboardModel } from '../models/DashboardModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  GetDashboardSummary(){
    return this.http.get<DashboardModel>(appsettings.api_url + 'Dashboard');
  }

  GetSMSSummary(){
    return this.http.get<SMSDashboardModel>(appsettings.api_url + 'Dashboard/sms');
  }
}
