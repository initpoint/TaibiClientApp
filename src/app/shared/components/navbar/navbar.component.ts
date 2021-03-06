import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CoreService} from '../../services/core.service';
import {Router} from '@angular/router';
import {ItemsService} from '../../services/Items.service';
import {AuthService} from '../../services/auth.service';
import {StatService} from '../../services/stat.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchValue;
  currentUserId = JSON.parse(localStorage.getItem('userData')).user_id;

  constructor(public itemsService: ItemsService, public authService: AuthService, public statService: StatService) {
  }

  ngOnInit() {
    this.itemsService.searchByTag.subscribe(tag => {
      this.searchValue = tag;
      this.searchInItems(this.searchValue);
    });
  }

  searchInItems(searchKeyWord: string) {
    this.itemsService.searchInItemsKeyWord.next(searchKeyWord);
  }

    getAllNotifications() {
        this.statService.missingFeature('notifications-get all')
    }
    clearNotifications() {
        this.statService.missingFeature('notifications-clear')
    }
}
