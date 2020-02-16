import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/shared/models/items.model';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  @Input() item: Item = new Item();

  constructor() { }

  ngOnInit() {
    console.log('item form vacanies', this.item.tags);
  }

}
