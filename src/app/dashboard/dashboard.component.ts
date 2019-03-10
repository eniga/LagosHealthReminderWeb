import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel, SMSDashboardModel } from '../models/DashboardModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = "Dashboard";
  SMSSent = 0;
  SMSBalance = 0;
  LastSent = new Date;
  LastUpdated = new Date;
  ValueUpdated = 0;

  patients = 0;
  settlements = 0;
  appointments = 0;
  defaulters = 0;
  todayAppointments = 0;

  constructor(private service: DashboardService) { }

  ngOnInit() {
    setInterval(()=> {
      this.getAll();
      this.GetSMSSummary();
    }, 60000);
  }

  getAll(){
    this.service.GetDashboardSummary().subscribe((data: DashboardModel) => {
      this.patients = data.patients;
      this.settlements = data.settlements;
      this.appointments = data.appointments;
      this.defaulters = data.defaulters;
      this.todayAppointments = data.todayAppointments;
    });
  }

  GetSMSSummary(){
    this.service.GetSMSSummary().subscribe((data: SMSDashboardModel) => {
      this.SMSSent = data.sent;
      this.SMSBalance = data.balance;
      this.LastSent = data.lastSent;
      this.LastUpdated = data.lastUpdated;
      this.ValueUpdated = data.lastAmount;
    });
  }

}
