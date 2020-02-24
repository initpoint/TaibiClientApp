import {Component, Input, OnInit} from '@angular/core';
import {Item} from 'src/app/shared/models/items.model';
import {ItemsService} from '../../../services/Items.service';
import {AuthService} from '../../../services/auth.service';
import {AppUser, UserType} from '../../../models/user.model';
import {StatService} from '../../../services/stat.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  @Input() item: Item;
  appliedBefore = false;
  canViewApplicants = false;
  applicants: AppUser[] = [];
  canApply = false;
  approved = false;

  constructor(public itemsService: ItemsService, public authService: AuthService, public statService: StatService) {
  }

  ngOnInit() {
    this.authService.updateCurrentUser().subscribe(ready => {
      // tslint:disable-next-line:triple-equals
      this.approved = this.item.approvedApplicant && this.item.approvedApplicant.uid == this.authService.currentUserId;
      this.canApply = this.authService.currentUser.type == UserType.Student && !this.approved;
      this.canViewApplicants = this.item.user && this.item.user.uid === this.authService.currentUser.uid;
      this.appliedBefore = this.item.usersApplyIds && this.item.usersApplyIds.includes(this.authService.currentUser.uid);
    });
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

  print() {
    this.statService.missingFeature('print-vacancy');
  }

  approveApplicant(applicant: AppUser) {
    this.item.approvedApplicant = applicant;
    this.itemsService.updateItem(this.item);
  }
}
