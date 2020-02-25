import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Item, ItemType} from 'src/app/shared/models/items.model';
import {ItemsService} from 'src/app/shared/services/Items.service';

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


  constructor(public itemsService: ItemsService) {
  }

  ngOnInit() {
    this.getItems();
    this.changeCurrentType();
    this.searchInItems();
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

  searchInItems() {
    this.itemsService.searchInItemsKeyWord.subscribe(value => {
      value = value.toLocaleLowerCase();
      if (value.length > 0) {
        this.itemsToDisplay = this.items.filter(item => {
            if (item.description.toLocaleLowerCase().includes(value)) {
              return true;
            }
            if (item.user.name.toLocaleLowerCase().includes(value)) {
              return true;
            }
            if (item.title && item.title.toLocaleLowerCase().includes(value)) {
              return true;
            }
            if (item.tags.map(tag => tag.toLocaleLowerCase().includes(value)).includes(true)) {
              return true;
            }
          }
        );
      } else {
        this.itemsToDisplay = this.items;
      }
    });
  }

  getItems(type: ItemType = ItemType.All) {
    this.isLoading = true;
    this.itemsService.getItems().subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
      this.isLoading = false;
      this.itemsToDisplay = this.items;
    });
  }

}
