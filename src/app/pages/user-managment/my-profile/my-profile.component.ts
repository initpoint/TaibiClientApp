import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { AppUser } from 'src/app/shared/models/user.model';
import { ItemsService } from 'src/app/shared/services/Items.service';
import { ItemType } from 'src/app/shared/models/items.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  items = [];
  isLoading = false;
  appUser: AppUser = new AppUser();
  currentUserId = "";

  constructor(private usersService: UsersService, private itemsService: ItemsService) { }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('userData')).user_id;
    this.usersService.getUserById(this.currentUserId).subscribe(data => {
      this.appUser.id = data.payload.id;
      this.appUser = data.payload.data();
      this.getItems();
    })
  }

  getItems() {
    this.isLoading = true;
    this.itemsService.getUserItems(this.currentUserId).subscribe(data => {
      console.log(data);
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      this.isLoading = false;
    });
  }

}
