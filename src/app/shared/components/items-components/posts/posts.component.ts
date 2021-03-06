import {Component, Input, OnInit} from '@angular/core';
import {Item} from 'src/app/shared/models/items.model';
import {ItemsService} from '../../../services/Items.service';
import {AuthService} from '../../../services/auth.service';
import {UserType} from '../../../models/user.model';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    @Input() item: Item;
    canRemove = false;

    constructor(public itemsService: ItemsService, public authService: AuthService) {
    }

    ngOnInit() {
        this.authService.updateCurrentUser().subscribe(ready => {
            this.canRemove = this.authService.currentUser.uid === this.item.user.uid ||
                this.authService.currentUser.type === UserType.Admin;
        });
    }

    remove() {
        if (confirm('Confirm Delete ?')) {
            this.itemsService.removeItem(this.item.id);
        }
    }
}
