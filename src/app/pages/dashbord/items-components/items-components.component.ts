import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item } from 'src/app/shared/models/items.model';
import { ItemsService } from 'src/app/shared/services/Items.service';

@Component({
  selector: 'app-items-components',
  templateUrl: './items-components.component.html',
  styleUrls: ['./items-components.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ItemsComponentsComponent implements OnInit {

  items: Item[] = [];
  isLoading = false;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.isLoading = true;
    this.itemsService.getItems().subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      this.isLoading = false;
    });
  }
}
