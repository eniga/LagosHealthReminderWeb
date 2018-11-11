import { Injectable } from '@angular/core';
import { CampaignModel } from '../models/CampaignModel';
import { appsettings } from '../appsettings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getAllMessages() {
    return this.http.get<CampaignModel[]>(appsettings.api_url + 'messages/campaign');
  }

  newMessage(campaign: CampaignModel){
    return this.http.post(appsettings.api_url + 'messages/campaign', campaign);
  }
}
