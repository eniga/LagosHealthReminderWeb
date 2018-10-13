import { Injectable } from "@angular/core";

@Injectable()

export class ServiceKindsModel {
    Id: number;
    Name: string;
    InsertDate: Date;
    InsertUserId: number;
    UpdateDate: Date;
    UpdateUserId: number;
}