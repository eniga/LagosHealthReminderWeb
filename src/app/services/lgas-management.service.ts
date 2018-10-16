import { Injectable } from '@angular/core';
import { appsettings } from '../appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LgaModel } from '../models/LgaModel';


@Injectable({
  providedIn: 'root'
})
export class LgasManagementService {

  constructor(private http: HttpClient) { }

  getAllLgas() {
    return this.http.get<LgaModel[]>(appsettings.api_url + 'lgas');
  }

  newLga(lga: LgaModel){
    return this.http.post(appsettings.api_url + 'lgas', lga);
  }

  updateLga(lga: LgaModel){
    return this.http.put(appsettings.api_url + 'lgas', lga);
  }

  deleteLga(lgaId: number){
    return this.http.delete(appsettings.api_url + 'lgas/' + lgaId);
  }
}
