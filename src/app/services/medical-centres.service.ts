import { Injectable } from '@angular/core';
import { MedicalCentresModel } from '../models/MedicalCentreModel';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class MedicalCentresService {

  centres: MedicalCentresModel[] = [];

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<MedicalCentresModel[]>(appsettings.api_url + 'settlements')
  }
}
