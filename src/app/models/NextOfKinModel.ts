import { Injectable } from "@angular/core";

@Injectable()

export class NextOfKinModel {
    NextOfKinId: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Phone: string;
    Email: string;
    InsertDate: Date;
    InsertUserId: number;
    UpdateDate: Date;
    UpdateUserId: number;
}
