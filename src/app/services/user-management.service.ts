import { Injectable } from '@angular/core';
import { UsersModel } from '../models/UsersModel';
import { appsettings } from '../appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  users: UsersModel[] = [];

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<UsersModel[]>(appsettings.api_url + 'users');
  }

}
