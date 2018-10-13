import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import swal from 'sweetalert'; 

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

  constructor() { }

  ngOnInit() {
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');
  }
  ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
  }

  onLoggedin(){
      if((this.username === 'admin' && this.password === 'admin') || (this.username === 'demo' && this.password === 'demo')){
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('user', this.username);
      } else {
        swal('Error', 'Invalid Username / Password', 'error');
      }
      //console.log("You tried to login with username " + this.username + " and password " + this.password);
      //swal('','Application is still under construction', 'info');
  }

  keyDownFunction(event){
    console.log(event);
  }

}
