import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { AppUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  appUser: AppUser = new AppUser();
  currentUserId = "";
 
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('userData')).user_id;
    this.usersService.getUserById(this.currentUserId).subscribe(data => {
      this.appUser.id = data.payload.id;
      this.appUser = data.payload.data();
    })
  }

}
