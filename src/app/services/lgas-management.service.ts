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

  getAllUsers() {
    return this.http.get<LgaModel[]>(appsettings.api_url + 'lgas');
  }
}
