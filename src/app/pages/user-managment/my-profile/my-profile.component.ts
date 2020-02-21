import {Component, OnInit} from '@angular/core';
import {UsersService} from 'src/app/shared/services/users.service';
import {AppUser} from 'src/app/shared/models/user.model';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {ItemType, Item} from 'src/app/shared/models/items.model';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  items = [];
  isLoading = false;
  vacancyToAdd = new Item();
  tags = '';

  constructor(public authService: AuthService, private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.vacancyToAdd.type = ItemType.Vacancy;
    this.vacancyToAdd.user = this.authService.currentUser;
    this.getItems();
  }

  getItems() {
    this.isLoading = true;
    this.itemsService.getUserItems(this.authService.currentUserId).subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
      this.isLoading = false;
    });
  }

  addVacancy() {
    this.vacancyToAdd.tags = this.tags.split(',');
    // this.vacanciesToAdd.createDate = new Date();
    // this.vacancyToAdd.id = 'wuiwuero';
    Object.keys(this.vacancyToAdd).forEach(key => this.vacancyToAdd[key] === undefined ? delete this.vacancyToAdd[key] : {});
    Object.keys(this.vacancyToAdd.user).forEach(key => this.vacancyToAdd.user[key] === undefined ? delete this.vacancyToAdd.user[key] : {});
    console.log(this.vacancyToAdd);
    this.itemsService.createItem(this.vacancyToAdd);
  }

}
