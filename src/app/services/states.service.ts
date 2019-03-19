import { Injectable } from '@angular/core';
import { StatesModel } from '../models/StatesModel';
import { appsettings } from '../appsettings';
import { ResponseModel } from '../models/ResponseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<StatesModel[]>(appsettings.api_url + 'states');
  }

  get(stateId: number){
    return this.http.get<StatesModel>(appsettings.api_url + 'states/' + stateId);
  }

  add(request: StatesModel){
    return this.http.post<ResponseModel>(appsettings.api_url + 'states', request);
  }

  update(request: StatesModel){
    return this.http.put<ResponseModel>(appsettings.api_url + 'states', request);
  }

  delete(stateId: number){
    return this.http.delete<ResponseModel>(appsettings.api_url + 'states/' + stateId);
  }
}
