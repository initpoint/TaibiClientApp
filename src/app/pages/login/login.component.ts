import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Login } from 'src/app/shared/models/login.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/shared/services/core.service';
import { NotifierService } from 'angular-notifier';
import { ResetPassword } from 'src/app/shared/models/reset-password.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private notifierService: NotifierService) {

  }

  ngOnInit() {
    
  }

  login() {
    this.auth.login({email: 'superadmin1@mailinator.com', password: 'string'}).subscribe(res => {
      localStorage.setItem('token', res.token);
      const token = localStorage.getItem('token');
      if(token) localStorage.setItem('tokenData', JSON.stringify(this.jwtHelper.decodeToken(token)));
      this.router.navigate(['/dashbord']);
    });
  }

  staticLogin(email: string) {
    this.auth.login({email: email, password: 'string'}).subscribe(res => {
      localStorage.setItem('token', res.token);
      const token = localStorage.getItem('token');
      if(token) localStorage.setItem('tokenData', JSON.stringify(this.jwtHelper.decodeToken(token)));
      var tokenObj = JSON.parse(localStorage.getItem('tokenData'));
      console.log(tokenObj);
      if(tokenObj.UserType == "Employee") {
        this.router.navigate(['/employees']);
      } else {
        this.router.navigate(['/super-admins']);
      }
    });
  }

}
