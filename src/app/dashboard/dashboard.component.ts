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
  patientBreakdown: PatientBreakdownModel[] = [];
  clientChart: any;
  appointmentChart: any;
  defaulterChart: any;
  yearId = moment().year();
    

  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };

  // public barChartLabels = this.patientBreakdown.map(x => x.monthName);
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   {data: this.patientBreakdown.map(x => x.totalCount), label: 'Patients'}
  // ];

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.GetAppointments();
    this.GetSMSSummary();
    this.GetTodayAppointments();
    this.GetDefaulters();
    this.GetPatients();
    this.GetSettlements();
    this.GetWards();
    this.GetLGAs();
    this.GetPHCs();
    this.GetPatientBreakdown();
    this.GetAppointmentBreakdown();
    this.GetDefaulterBreakdown();
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

  GetPatientBreakdown(){
    this.service.GetPatientBreakdowns(this.yearId).subscribe((data: PatientBreakdownModel[]) => {
      this.clientChart = new Chart(this.clientchartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: data.map(x => x.monthName), // your labels array
          datasets: [
            {
              data: data.map(x => x.totalCount), // your data array
              borderColor: '#00AEFF',
              fill: true,
              backgroundColor: '#17a2b8'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    })
  }

  GetAppointmentBreakdown(){
    this.service.GetAppointmentBreakdown(this.yearId).subscribe((data: PatientBreakdownModel[]) => {
      this.appointmentChart = new Chart(this.appointmentchartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: data.map(x => x.monthName), // your labels array
          datasets: [
            {
              data: data.map(x => x.totalCount), // your data array
              borderColor: '#00AEFF',
              fill: true,
              backgroundColor: '#fedbe5'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    })
  }

  GetDefaulterBreakdown(){
    this.service.GetDefaulterBreakdown(this.yearId).subscribe((data: PatientBreakdownModel[]) => {
      this.defaulterChart = new Chart(this.defaulterchartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: data.map(x => x.monthName), // your labels array
          datasets: [
            {
              data: data.map(x => x.totalCount), // your data array
              borderColor: '#00AEFF',
              fill: true,
              backgroundColor: '#dadeff'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    })
  }
}
