import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = "Dashboard";
  SMSSent = 7;
  SMSBalance = 411.86;
  LastSent = new Date;
  LastUpdated = new Date;
  ValueUpdated = 440;


  constructor() { }

  ngOnInit() {
  }


}
