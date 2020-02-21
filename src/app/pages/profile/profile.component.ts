import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppUser, ProfileType, UserType} from '../../shared/models/user.model';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Item, ItemType} from '../../shared/models/items.model';
import {ItemsService} from '../../shared/services/Items.service';
import {StatService} from '../../shared/services/stat.service';

@Component({
  selector: 'app-profile-components',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProfileComponent implements OnInit {

  user: AppUser;
  userId: string;
  items = [];
  isLoading = false;
  vacancyToAdd = new Item();
  facilityToAdd = new Item();
  vacancyToAddtags = '';
  facilityToAddtags = '';

  constructor(public authService: AuthService, private itemsService: ItemsService,
              private statService: StatService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(x => {
      this.userId = x['id'];
      this.authService.getUser(this.userId).subscribe(x => {
        this.user = x.payload.data();
      });
    });
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
    this.vacancyToAdd.type = ItemType.Vacancy;
    this.vacancyToAdd.user = this.authService.currentUser;
    this.vacancyToAdd.tags = this.vacancyToAddtags.split(',');
    this.vacancyToAdd.createDate = Date.now();
    this.itemsService.createItem(this.vacancyToAdd);
  }

  addFacility() {
    this.facilityToAdd.type = ItemType.Facility;
    this.facilityToAdd.user = this.authService.currentUser;
    this.facilityToAdd.tags = this.facilityToAddtags.split(',');
    this.facilityToAdd.createDate = Date.now();
    this.itemsService.createItem(this.facilityToAdd);
  }

  changeCover() {
    this.statService.missingFeature('user-changeCover');
  }
}