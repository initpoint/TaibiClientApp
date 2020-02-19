import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/Items.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public itemsService: ItemsService, private router: Router) { }

  ngOnInit() {
  }

  searchInItems(searchKeyWord: string) {
    this.itemsService.searchInItemsKeyWord.next(searchKeyWord);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
