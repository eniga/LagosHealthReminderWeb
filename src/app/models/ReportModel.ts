import { Injectable } from "@angular/core";

@Injectable()

export class AppointmentReport{
    firstName: string;
    lastName: string;
    fullName: string;
    qrCode: string;
    phone: string;
    serviceKindName: string;
    serviceTypeName: string;
    appointmentDate: Date;
    confirmationDate: Date;
    dateCreated: Date;
    settlement: string;
    ward: string;
    lga: string;
    phc: string;
    reminderStatus: string;
    dateSent: Date;
    intervention: string;
}