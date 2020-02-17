import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginVM } from 'src/app/shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginVM = new LoginVM();

  constructor(
    public auth: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private notifierService: NotifierService) {

  }

  ngOnInit() {

  }

  login() {
    this.auth.login(this.loginVM).subscribe(async x => {
      const token = await x.user.getIdToken();
      localStorage.setItem('token', token);
      this.router.navigate(['/dashbord']);
    }, e => {
      this.notifierService.notify('error', 'Incorrect username or password');
    });
  }

  // staticLogin(email: string) {
  //   this.auth.login({ email: email, password: 'string' }).subscribe(res => {
  //     localStorage.setItem('token', res.token);
  //     const token = localStorage.getItem('token');
  //     if (token) localStorage.setItem('tokenData', JSON.stringify(this.jwtHelper.decodeToken(token)));
  //     var tokenObj = JSON.parse(localStorage.getItem('tokenData'));
  //     console.log(tokenObj);
  //     if (tokenObj.UserType == "Employee") {
  //       this.router.navigate(['/employees']);
  //     } else {
  //       this.router.navigate(['/super-admins']);
  //     }
  //   });
  // }

}
