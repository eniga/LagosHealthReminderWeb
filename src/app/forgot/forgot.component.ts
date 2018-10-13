import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert'; 

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  mydate: Date = new Date();
  focus;
  focus1;

  constructor() { }

  ngOnInit() {
  }

  forgotpassword(){
    swal('', 'Password has been sent to your mobile phone', 'success');
  }

}
