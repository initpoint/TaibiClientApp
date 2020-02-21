import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginVM} from 'src/app/shared/models/login.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService,
    private usersService: UsersService,
    private notifierService: NotifierService) {
  }

  ngOnInit() {
  }

  login(email?, pass?) {

    if (email && pass) {
      this.loginVM.email = email;
      this.loginVM.password = pass;
    }
    this.auth.login(this.loginVM).subscribe(async x => {
      const token = await x.user.getIdToken();
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(this.jwtHelper.decodeToken(token)));
      this.auth.updateCurrentUser();
      this.router.navigate(['/dashbord']);
    }, e => {
      this.toastrService.error(e.message);
    });
  }
}
