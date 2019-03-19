import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';
import { Observable } from 'rxjs';
import { AppointmentReport } from '../models/ReportModel';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  GetAppointments(){
    return this.http.get<AppointmentReport[]>(appsettings.api_url + 'Reports/appointments');
  }
}
