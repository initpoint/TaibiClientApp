import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/shared/services/Items.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.getItems().subscribe(x =>  {
      x.map(e => {
       console.log(e.payload.doc.data())
      })

    }
      );
  }

}
