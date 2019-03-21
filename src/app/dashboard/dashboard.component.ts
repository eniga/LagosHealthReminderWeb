import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel, SMSDashboardModel, PatientBreakdownModel } from '../models/DashboardModel';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';
import * as moment from 'moment';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('clientChart') private clientchartRef;
  @ViewChild('appointmentChart') private appointmentchartRef;
  @ViewChild('defaulterChart') private defaulterchartRef;
  @ViewChild('returneeChart') private returneechartRef;
  @ViewChild('onScheduleChart') private onschedulechartRef;

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
  wards = 0;
  lgas = 0;
  phcs = 0;
  pageUpdate = new Date;
  yearId = moment().year();
  randomization = 0;
  clientDash: DashboardModel = { currentMonth: 0, lastMonth: 0};
  appointmentDash: DashboardModel = { currentMonth: 0, lastMonth: 0};
  onScheduleDash: DashboardModel = { currentMonth: 0, lastMonth: 0};
  defaultersDash: DashboardModel = { currentMonth: 0, lastMonth: 0};
  defaultersReturnedDash: DashboardModel = { currentMonth: 0, lastMonth: 0};
  activePhcDash: DashboardModel = { currentMonth: 0, lastMonth: 0};
  activeServicesDash: string[] = [];

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.GetDefaulters()
    this.GetPatients();
    this.GetSMSSummary();
    this.GetRandomization();
    this.GetClientDashboard();
    this.GetAppointmentsDashboard();
    this.GetClientsOnScheduledDashboard();
    this.GetDefaultersDashboard();
    this.GetDefaultersReturnedDashboard();
    this.GetActivePHCsDashboard();
    this.GetActiveServices()
  }


  GetSMSSummary(){
    this.service.GetSMSSummary().subscribe((data: SMSDashboardModel) => {
      this.SMSSent = data.sent;
      this.SMSBalance = data.balance;
      this.LastSent = data.lastSent;
      this.LastUpdated = data.lastUpdated;
      this.ValueUpdated = data.lastAmount;
      this.pageUpdate = new Date;
    });
  }

  GetAppointments(){
    this.service.GetAppointments().subscribe((data: number) => {
      this.appointments = data;
      this.pageUpdate = new Date;
    });
  }

  GetTodayAppointments(){
    this.service.GetTodayAppointments().subscribe((data: number) => {
      this.todayAppointments = data;
      this.pageUpdate = new Date;
    });
  }

  GetDefaulters(){
    this.service.GetDefaulters().subscribe((data: number) => {
      this.defaulters = data;
      this.pageUpdate = new Date;
    });
  }

  GetPatients(){
    this.service.GetPatients().subscribe((data: number) => {
      this.patients = data;
      this.pageUpdate = new Date;
    });
  }

  GetSettlements(){
    this.service.GetSettlements().subscribe((data: number) => {
      this.settlements = data;
      this.pageUpdate = new Date;
    });
  }

  GetWards(){
    this.service.GetWards().subscribe((data: number) => {
      this.wards = data;
      this.pageUpdate = new Date;
    });
  }

  GetLGAs(){
    this.service.GetLGAs().subscribe((data: number) => {
      this.lgas = data;
      this.pageUpdate = new Date;
    });
  }

  GetPHCs(){
    this.service.GetPHCs().subscribe((data: number) => {
      this.phcs = data;
      this.pageUpdate = new Date;
    });
  }

  GetRandomization(){
    this.service.GetRandomization().subscribe((data: number) => {
      this.randomization = data;
      this.pageUpdate = new Date;
    });
  }

  GetClientDashboard(){
    this.service.GetClientDashboard().subscribe((data: DashboardModel) => {
      this.clientDash = data;
      this.pageUpdate = new Date;
    })
  }

  GetAppointmentsDashboard(){
    this.service.GetAppointmentsDashboard().subscribe((data: DashboardModel) => {
      this.appointmentDash = data;
      this.pageUpdate = new Date;
    })
  }

  GetClientsOnScheduledDashboard(){
    this.service.GetAppointmentsDashboard().subscribe((data: DashboardModel) => {
      this.onScheduleDash = data;
      this.pageUpdate = new Date;
    })
  }

  GetDefaultersDashboard(){
    this.service.GetDefaultersDashboard().subscribe((data: DashboardModel) => {
      this.defaultersDash = data;
      this.pageUpdate = new Date;
    })
  }

  GetDefaultersReturnedDashboard(){
    this.service.GetDefaultersReturnedDashboard().subscribe((data: DashboardModel) => {
      this.defaultersReturnedDash = data;
      this.pageUpdate = new Date;
    })
  }

  GetActivePHCsDashboard(){
    this.service.GetActivePHCsDashboard().subscribe((data: DashboardModel) => {
      this.activePhcDash = data;
      this.pageUpdate = new Date;
    })
  }

  GetActiveServices(){
    this.service.GetActiveServices().subscribe((data: string[]) => {
      this.activeServicesDash = data;
      this.pageUpdate = new Date;
    })
  }
}
