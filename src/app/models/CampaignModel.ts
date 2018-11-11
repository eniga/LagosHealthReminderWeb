import { Injectable } from "@angular/core";

@Injectable()

export class CampaignModel {
    campaignId: number;
    lgaId: number;
    lga: string;
    insertUserId: number;
    insertUser: string;
    insertDate: Date;
    dateSent: Date;
    message: string;
    status: number;
}