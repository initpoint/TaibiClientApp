import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Item, ItemType } from 'src/app/shared/models/items.model';
import { ItemsService } from 'src/app/shared/services/Items.service';

@Component({
  selector: 'app-items-components',
  templateUrl: './items-components.component.html',
  styleUrls: ['./items-components.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ItemsComponentsComponent implements OnInit {

  items: Item[] = [];
  itemsToDisplay: Item[] = [];
  isLoading = false;


  constructor(public itemsService: ItemsService) { }

  ngOnInit() {
    this.getItems();
    this.changeCurrentType();
  }

  changeCurrentType() {
    this.itemsService.currentItemType.subscribe(value => {
      if (value == ItemType.All) {
        this.itemsToDisplay = this.items;
      } else {
        this.itemsToDisplay = this.items.filter(x => x.type == value);
      }
    });
  }

  getItems(type: ItemType = ItemType.All) {
    this.isLoading = true;
    this.itemsService.getItems(type).subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      this.isLoading = false;
      this.itemsToDisplay = this.items;
    });
  }

}
