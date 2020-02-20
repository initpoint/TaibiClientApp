import {Component, Input, OnInit} from '@angular/core';
import {Item} from 'src/app/shared/models/items.model';
import {ItemsService} from '../../../services/Items.service';
import {AuthService} from '../../../services/auth.service';
import {AppUser, UserType} from '../../../models/user.model';

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
  canApply = false;

  constructor(public itemsService: ItemsService, public authService: AuthService) {
  }

  ngOnInit() {
    this.canApply = this.authService.currentUser.type === UserType.Student;
    this.canViewApplicants = this.item.user && this.item.user.id === this.authService.currentUserId;
    this.appliedBefore = this.item.usersApplyIds && this.item.usersApplyIds.includes(this.authService.currentUserId);
  }

  apply(e: MouseEvent) {
    if (this.item.usersApplyIds) {
      this.item.usersApplyIds.push(this.authService.currentUserId);
    } else {
      this.item.usersApplyIds = [this.authService.currentUserId];
    }
    this.itemsService.updateItem(this.item);
  }

  viewApplicants(e: MouseEvent) {
    this.applicants = [];
    this.item.usersApplyIds.map(userId => this.authService.getUser(userId)
      .subscribe(userDoc => {
        this.applicants.push(userDoc.payload.data() as AppUser);
      }));
  }
}
