import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/shared/models/items.model';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  @Input() item: Item = new Item();
  
  constructor() { }

  ngOnInit() {
    console.log('item form facilities', this.item.tags);
  }

}
