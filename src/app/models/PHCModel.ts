import { Injectable } from "@angular/core";

@Injectable()

export class PHCModel {
    phcId: number;
    phc: string;
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