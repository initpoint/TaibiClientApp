import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppUser, ProfileType, UserType} from '../../shared/models/user.model';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile-components',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProfileComponent implements OnInit {

  user: AppUser;
  userId: string;
  profileType: ProfileType = ProfileType.Nothing;

  constructor(public authService: AuthService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(x => {
      this.userId = x['id'];
      if (this.userId === 'currentUser' || this.authService.currentUserId === this.userId) {
        this.user = this.authService.currentUser;
        if (this.user.type === UserType.Student) {
          this.profileType = ProfileType.CurrentStudent;
        } else {
          this.profileType = ProfileType.CurrentUniversity;
        }
      } else {
        this.authService.getUser(this.userId).subscribe(userDoc => {
          this.user = userDoc.payload.data() as AppUser;
          if (this.user.type === UserType.Student) {
            this.profileType = ProfileType.Student;
          } else {
            this.profileType = ProfileType.University;
          }
        });
      }
    });
  }
}
