import { Injectable } from "@angular/core";

@Injectable()

export class LgaModel {
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