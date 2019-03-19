import { Injectable } from "@angular/core";

@Injectable()

export class DashboardModel {
    patients: number;
    settlements: number;
    appointments: number;
    defaulters: number;
    todayAppointments: number;
}

export class SMSDashboardModel {
    username: string;
    password: string;
    sent: number;
    balance: number;
    lastSent: Date;
    lastUpdated: Date;
    lastAmount: number;
    url: string;
    appName: string;
}

export class PatientBreakdownModel {
    monthId: number;
    monthName: string;
    totalCount: number;
}