import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';
import { DashboardModel, SMSDashboardModel, PatientBreakdownModel } from '../models/DashboardModel';
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

  GetAppointments(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/appointments');
  }

  GetTodayAppointments(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/appointments/today');
  }

  GetDefaulters(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/defaulters');
  }

  GetPatients(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/patients');
  }

  GetSettlements(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/settlements');
  }

  GetWards(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/wards');
  }

  GetLGAs(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/lgas');
  }

  GetPHCs(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/phcs');
  }

  GetPatientBreakdowns(yearId: number){
    return this.http.get<PatientBreakdownModel[]>(appsettings.api_url + 'Dashboard/patients/breakdown/' + yearId);
  }

  GetAppointmentBreakdown(yearId: number){
    return this.http.get<PatientBreakdownModel[]>(appsettings.api_url + 'Dashboard/appointments/breakdown/' + yearId);
  }

  GetDefaulterBreakdown(yearId: number){
    return this.http.get<PatientBreakdownModel[]>(appsettings.api_url + 'Dashboard/defaulters/breakdown/' + yearId);
  }
}
