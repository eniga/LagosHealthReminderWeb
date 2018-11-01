import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';
import { QrCodeModel, QrCodeStatus, QrCodeRequestModel } from '../models/QrCodeModel';

@Injectable({
  providedIn: 'root'
})
export class QrManagementService {

  constructor(private http: HttpClient) { }

  getAllCodes(){
    return this.http.get<QrCodeModel[]>(appsettings.api_url + 'qrcodes');
  }

  getUnprinted(){
    return this.http.get<QrCodeModel[]>(appsettings.api_url + 'qrcodes/unprinted');
  }

  generateCode(request: QrCodeRequestModel){
    return this.http.post(appsettings.api_url + 'qrcodes', request);
  }

  confirmPrinted(){
    return this.http.put(appsettings.api_url + 'qrcodes/printed', true);
  }
}
