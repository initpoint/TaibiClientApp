import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Item, ItemType} from 'src/app/shared/models/items.model';
import {StatService} from '../../shared/services/stat.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashbordComponent implements OnInit {

  constructor(public itemsService: ItemsService, public statService: StatService) {
  }

  ngOnInit() {
  }

  changeCurrentType(type: ItemType) {
    this.itemsService.currentItemType.next(type);
  }

  notAvailable(tag: string) {
    this.statService.missingFeature(`filter-${tag}`);
  }
}
