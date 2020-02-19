import {Component, OnInit, Input} from '@angular/core';
import {Item} from 'src/app/shared/models/items.model';
import {ItemsService} from '../../../../shared/services/Items.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../../../shared/services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  @Input() item: Item = new Item();
  appliedBefore = false;
  userId;

  constructor(public itemsService: ItemsService, public jwtHelper: JwtHelperService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.userId = this.jwtHelper.decodeToken(token)['user_id'];
    this.appliedBefore = this.item.usersApplyIds && this.item.usersApplyIds.includes(this.userId);
  }

  apply(e: MouseEvent) {
    if (this.item.usersApplyIds) {
      this.item.usersApplyIds.push(this.userId);
    } else {
      this.item.usersApplyIds = [this.userId];
    }
    this.itemsService.updateItem(this.item);
  }
}
