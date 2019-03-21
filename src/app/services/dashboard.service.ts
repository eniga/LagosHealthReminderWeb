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


  GetSMSSummary(){
    return this.http.get<SMSDashboardModel>(appsettings.api_url + 'Dashboard/sms');
  }

  GetAppointments(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/appointments/total');
  }

  GetTodayAppointments(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/appointments/today/total');
  }

  GetDefaulters(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/defaulters/total');
  }

  GetPatients(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/patients/total');
  }

  GetSettlements(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/settlements/total');
  }

  GetWards(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/wards/total');
  }

  GetLGAs(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/lgas/total');
  }

  GetPHCs(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/phcs/total');
  }

  GetRandomization(){
    return this.http.get<number>(appsettings.api_url + 'Dashboard/randomization');
  }

  GetClientDashboard(){
    return this.http.get<DashboardModel>(appsettings.api_url + 'Dashboard/patients');
  }

  GetAppointmentsDashboard(){
    return this.http.get<DashboardModel>(appsettings.api_url + 'Dashboard/appointments');
  }

  GetClientsOnScheduledDashboard(){
    return this.http.get<DashboardModel>(appsettings.api_url + 'Dashboard/patients/onschedule');
  }

  GetDefaultersDashboard(){
    return this.http.get<DashboardModel>(appsettings.api_url + 'Dashboard/defaulters');
  }

  GetDefaultersReturnedDashboard(){
    return this.http.get<DashboardModel>(appsettings.api_url + 'Dashboard/defaulters/returned');
  }

  GetActivePHCsDashboard(){
    return this.http.get<DashboardModel>(appsettings.api_url + 'Dashboard/phcs/active');
  }

  GetActiveServices(){
    return this.http.get<string[]>(appsettings.api_url + 'Dashboard/services/active/list');
  }
}
