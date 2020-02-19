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

  constructor(public itemsService: ItemsService, public jwtHelper: JwtHelperService, public authService: AuthService) {

    this.authService.getCurrentUser().subscribe(doc => {
      const user = doc.payload.data() as AppUser;
      this.canViewApplicants = user.type === UserType.University || true; //todo remove the true when registration is done
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
    console.log('ViewApplicants', e);
  }

  getUserName(applicantId: string) {
    return applicantId;//todo get this user from db by thier id
  }
}
