import { Injectable } from "@angular/core";

@Injectable()

export class PatientsModel {
    patientId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    altPhone: string;
    email: string;
    dob: Date;
    settlementId: number;
    wardId: number;
    ward: string;
    lgaId: number;
    lga: string;
    stateId: number;
    state: string;
    insertDate: Date;
    insertUserId: number;
    insertUser: string;
    updateDate: Date;
    updateUserId: number;
    updateUser: string;
}