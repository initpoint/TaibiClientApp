import {Component, Input, OnInit} from '@angular/core';
import {AppUser} from 'src/app/shared/models/user.model';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {ItemType, Item} from 'src/app/shared/models/items.model';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {StatService} from '../../../shared/services/stat.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() user: AppUser;

  items = [];
  isLoading = false;

  constructor(public authService: AuthService, private itemsService: ItemsService, private statService: StatService) {
  }

  ngOnInit() {
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

  message() {
    this.statService.missingFeature('user-message');
  }
}
