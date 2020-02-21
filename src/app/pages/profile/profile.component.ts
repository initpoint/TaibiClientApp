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
      this.authService.getUser(this.userId).subscribe(x => {
        this.user = x.payload.data();
      })
    });
  }
}
