import { Injectable } from "@angular/core";

@Injectable()

export class WardsModel {
    wardId: number;
    ward: string;
    lgaId: number;
    lga: string;
    stateId: number;
    state: string;
    insertUserId: number;
    insertUser: string;
    insertDate: Date;
    updateUserId: number;
    updateUser: string;
    updateDate: Date;
}