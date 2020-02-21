import { Component, OnInit } from '@angular/core';
import { RegisterVM } from 'src/app/shared/models/register.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from 'src/app/shared/services/users.service';
import { AppUser, UserType } from 'src/app/shared/models/user.model';
import { from } from 'rxjs';
import { CoreService } from 'src/app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import { StatService } from 'src/app/shared/services/stat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerVM = new RegisterVM();

  constructor(
    public auth: AuthService,
    private router: Router,
    private usersService: UsersService,
    private coreService: CoreService,
    private jwtHelper: JwtHelperService,
    public statService: StatService,
    private toastrService: ToastrService,
    private notifierService: NotifierService) {

  }

  ngOnInit() {
    this.registerVM.userType = UserType.University;
  }

  register() {
    this.auth.register(this.registerVM).subscribe(async x => {
      const token = await x.user.getIdToken();
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(this.jwtHelper.decodeToken(token)));
      this.createNewUser(this.registerVM, JSON.parse(localStorage.getItem('userData')).user_id);
      this.router.navigate(['/dashbord']);
    }, e => {
      this.toastrService.error(e.message);
    });

  }

  createNewUser(register: RegisterVM, userId: string) {
    const user = new AppUser();
    user.uid = userId;
    user.email = register.email;
    user.type = register.userType;

    Object.keys(user).forEach(key => user[key] === undefined && delete user[key])
    const o = {};
    Object.keys(user).map(key => o[key] = user[key]);
    return from(this.usersService.createUser(o));
  }

}
