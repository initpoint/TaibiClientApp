import {Component, Input, OnInit} from '@angular/core';
import {Item} from 'src/app/shared/models/items.model';
import {ItemsService} from '../../../services/Items.service';
import {AuthService} from '../../../services/auth.service';
import {AppUser, UserType} from '../../../models/user.model';
import {StatService} from '../../../services/stat.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() item: Item;

  constructor(public itemsService: ItemsService, public authService: AuthService, public statService: StatService) {
  }

  ngOnInit() {
    this.authService.updateCurrentUser().subscribe(ready => {
    });
  }
}
