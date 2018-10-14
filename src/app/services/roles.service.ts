import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolesModel } from '../models/RolesModel';
import { appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get<RolesModel[]>(appsettings.api_url + 'roles');
  }

  addNewRole(roleName: string){
    let role = new RolesModel;
    role.roleName = roleName;
    return this.http.post(appsettings.api_url + 'roles', role);
  }

  updateRole(Role: RolesModel) {
    return this.http.put(appsettings.api_url + 'roles', Role)
  }
}
