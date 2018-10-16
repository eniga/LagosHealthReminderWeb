import { Injectable } from '@angular/core';
import { UsersModel, LoginUserModel } from '../models/UsersModel';
import { appsettings } from '../appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRolesModel } from '../models/UserRolesModel';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<UsersModel[]>(appsettings.api_url + 'users');
  }

  getUser(userId: number) {
    return this.http.get<UsersModel>(appsettings.api_url + 'users/' + userId);
  }

  getUserByUsername(username: string) {
    return this.http.get<UsersModel>(appsettings.api_url + 'users/username/' + username);
  }

  assignRole(userRole: UserRolesModel) {
    return this.http.post(appsettings.api_url + 'users/role', userRole);
  }

  updateRole(userRole: UserRolesModel){
    return this.http.put(appsettings.api_url + 'users/role', userRole);
  }

  changePassword(userRole: UsersModel) {
    return this.http.put(appsettings.api_url + 'users/updatepassword', userRole);
  }

  login(loginUser: LoginUserModel) {
    return this.http.post(appsettings.api_url + 'users/login', loginUser);
  }

  removeUser(userId: number){
    return this.http.delete(appsettings.api_url + 'users/' + userId);
  }

  addUser(user: UsersModel){
    return this.http.post(appsettings.api_url + 'users', user);
  }

  updateUser(user: UsersModel){
    return this.http.put(appsettings.api_url + 'users', user);
  }

}
