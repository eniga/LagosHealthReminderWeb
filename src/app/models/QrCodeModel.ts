import { Injectable } from "@angular/core";

@Injectable()

export class QrCodeModel {
    qrCodeId: number;
    qrCode: string;
    qrImage: string;
    patientId: number;
    patientName: string;
    insertUserId: number;
    insertUser: string;
    insertDate: Date;
    updateUserId: number;
    updateUser: string;
    updateDate: Date;
    status: QrCodeStatus;
}

export enum QrCodeStatus {
    Generated = 1,
    Printed = 2,
    Reprinted = 3
}