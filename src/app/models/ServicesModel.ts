import { Injectable } from "@angular/core";

@Injectable()

export class ServiceKindsModel {
    serviceKindId: number;
    serviceKindName: string;
    serviceTypeId: number;
    serviceType: string;
    insertDate: Date;
    insertUserId: number;
    insertUser: string;
    updateDate: Date;
    updateUserId: number;
    updateUser: string;
    typeId: number;
    type: string;
    duration: number;
}

export class ServiceTypesModel {
    serviceTypeId: number;
    serviceTypeName: string;
    insertUserId: number;
    insertUser: string;
    insertDate: Date;
    updateUserId: number;
    updateUser: string;
    updateDate: Date;
    smsMessage: string;
}

export class TypesModel {
    typeId: number;
    type: string;
}