import {Component, Input, OnInit} from '@angular/core';
import {AppUser, Item, UserType} from 'src/app/shared/models/items.model';
import {ItemsService} from '../../../../shared/services/Items.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  @Input() item: Item = new Item();
  appliedBefore = false;
  canViewApplicants = false;
  applicants: AppUser[] = [];

  constructor(public itemsService: ItemsService, public jwtHelper: JwtHelperService, public authService: AuthService) {
    this.authService.getCurrentUser().subscribe(doc => {
      const user = doc.payload.data() as AppUser;
      this.canViewApplicants = user.type === UserType.University || true; //todo remove the true when registration is done and check that the userid is the same
    });
  }

  ngOnInit() {
    this.appliedBefore = this.item.usersApplyIds && this.item.usersApplyIds.includes(this.authService.auth.auth.currentUser.uid);
  }

  apply(e: MouseEvent) {
    if (this.item.usersApplyIds) {
      this.item.usersApplyIds.push(this.authService.auth.auth.currentUser.uid);
    } else {
      this.item.usersApplyIds = [this.authService.auth.auth.currentUser.uid];
    }
    this.itemsService.updateItem(this.item);
  }

  viewApplicants(e: MouseEvent) {
    this.applicants = [];
    this.item.usersApplyIds.map(userId => this.authService.getUser(userId)
      .subscribe(userDoc => this.applicants.push(userDoc.payload.data() as AppUser)));
  }

}
