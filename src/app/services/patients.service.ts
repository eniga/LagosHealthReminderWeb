import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientsModel } from '../models/PatientsModel';
import { appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  getAllPatients() {
    return this.http.get<PatientsModel[]>(appsettings.api_url + 'patients');
  }

  addPatient(item: PatientsModel){
    return this.http.post(appsettings.api_url + 'patients', item);
  }

  updatePatient(item: PatientsModel){
    return this.http.put(appsettings.api_url + 'patients', item);
  }

  removePatient(patientId: number){
    return this.http.delete(appsettings + 'patients/' + patientId);
  }
}
