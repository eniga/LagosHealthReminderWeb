import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppointmentReport } from '../models/ReportModel';
import { ReportsService } from '../services/reports.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  // Array of Reports
  displayedColumns: string[] = ['fullName', 'qrCode', 'phone', 'serviceKindName', 'serviceTypeName', 'appointmentDate', 'confirmationDate', 'settlement', 'ward', 'lga', 'reminderStatus', 'dateSent', 'intervention'];
  dataSource: MatTableDataSource<AppointmentReport>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  filterValue: string;
  total: number;
  isLoading = true;
  
  appointments: AppointmentReport[] = [];
  constructor(private service: ReportsService) { }

  ngOnInit() {
    this.GetAppointments();
  }

  GetAppointments(){
    this.service.GetAppointments().subscribe((data: AppointmentReport[]) => {
      this.appointments = data;
      this.dataSource = new MatTableDataSource(this.appointments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updateTotal();
    })
  }

  // Method to filter the displayed data, used for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.updateTotal();
  }

    // Method to update the number of total available records in the array
    updateTotal(){
      this.total = this.dataSource.filteredData.length == undefined ? this.dataSource.data.length : this.dataSource.filteredData.length;
      this.isLoading = false;
    }
  
    // Method to export to Excel
    exportTable(){
      //const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
      const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.appointments);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'AppointmentReport.xlsx');
    }

    checkDate(value){
      if(moment(value).year() > 1){
        return moment(value).format("LL");
      } else {
        return ''
      }
    }

    formatDate(value){
      return moment(value).format("LL");
    }
  
}
