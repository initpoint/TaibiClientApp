import {Component, OnInit} from '@angular/core';
import {RegisterVM} from 'src/app/shared/models/register.model';
import {AppUser, UserType} from "../../models/user.model";
import {from} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {CoreService} from "../../services/core.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerVM = new RegisterVM();
  public canCreateAdmin: boolean;
  constructor(
      public auth: AuthService,
      public router: Router,
      private coreService: CoreService,
      private jwtHelper: JwtHelperService,
      private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.registerVM.userType = UserType.Student;
    this.canCreateAdmin = this.auth.currentUser.type === UserType.Admin;
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
    user.createDate = Date.now();
    if (user.type == UserType.Student || user.type == UserType.Professor) {
      user.name = 'Write Your Name Here';
      user.jobTitle = 'Job Title Goes Here';
      user.photoUrl = 'https://www.bitgab.com/uploads/profile/files/default.png';
      user.coverPhotoUrl = 'https://static1.squarespace.com/static/5582e684e4b077043cc7b379/568056f16bb3110e84ed1c39/5ddaa7a6a46d122f382a5a32/1574611754760/How+to+Write+A+Great+Cover+Letter.jpg?format=2500w';
    } else if (user.type == UserType.University) {
      user.name = 'Write University Name Here';
      user.jobTitle = 'University Moto Here';
      user.photoUrl = 'https://simplehq.co/wp-content/uploads/2017/02/image-placeholder-blue.png';
      user.coverPhotoUrl = 'data:image/jpeg;base64,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';
    }
    user.numberOfFollowers = Math.floor((Math.random() * 10000) + 1);
    user.numberOfFollowing = Math.floor((Math.random() * 10000) + 1);
    return from(this.auth.createUser(user));
  }
}
