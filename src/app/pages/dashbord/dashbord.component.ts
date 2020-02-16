import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemsService } from 'src/app/shared/services/Items.service';
import { Item } from 'src/app/shared/models/items.model';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashbordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
}
