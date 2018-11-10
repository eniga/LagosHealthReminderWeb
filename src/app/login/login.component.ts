import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import swal from 'sweetalert'; 
import { UserManagementService } from '../services/user-management.service';
import { LoginUserModel, UsersModel } from '../models/UsersModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mydate: Date = new Date();
  focus;
  focus1;
  username: string = '';
  password: string = '';

  constructor(private service: UserManagementService, private router: Router) { }

  ngOnInit() {
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');
  }
  ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
  }

  onLoggedin(){
      if(this.username.length < 1 || this.password.length < 1) {
        swal('Error', 'Please enter a username / password', 'error');
      } else {
        let user = new LoginUserModel;
        user.username = this.username;
        user.password = this.password;
        this.service.login(user).subscribe((data: Response) => {
          if(data.status) {
            this.service.getUserByUsername(this.username).subscribe((data: UsersModel) => {
              if(data.isActive){
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('user', this.username);
                localStorage.setItem('userId', data.userId.toString());
                localStorage.setItem('displayName', data.displayName);
                localStorage.setItem('roleName', data.roleName);
                this.router.navigate(['/dashboard']);
              } else {
                swal('User is disabled', 'Kindly contact portal Administrator', 'error');
              }
            })
            
          } else {
            swal('Error', 'Invalid Username / Password', 'error');
          }
        })
      }
  }

  keyDownFunction(event){
    console.log(event);
  }

}
