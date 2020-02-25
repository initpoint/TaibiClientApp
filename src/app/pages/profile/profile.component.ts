import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppUser, UserExperiance, UserType} from '../../shared/models/user.model';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Item, ItemType} from '../../shared/models/items.model';
import {ItemsService} from '../../shared/services/Items.service';
import {StatService} from '../../shared/services/stat.service';

@Component({
  selector: 'app-profile-components',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProfileComponent implements OnInit {
  currentTab = 1;
  user: AppUser = new AppUser();
  userId: string;
  items = [];
  isLoading = false;
  userTags = '';
  userKnowledge = '';
  userInterests = '';

  vacancyToAdd = new Item();
  facilityToAdd = new Item();
  postToAdd = new Item();
  experienceToAdd = new UserExperiance();
  accomplishmentToAdd = new UserExperiance();
  vacancyToAddTags = '';
  facilityToAddTags = '';

  canAddVacancy = false;
  canAddFacility = false;
  canAddPost = false;
  canEditInfo = false;
  isStudent = false;
  isProfessor = false;

  constructor(public authService: AuthService, private itemsService: ItemsService,
              public statService: StatService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(x => {
      this.userId = x['id'];
      this.authService.getUser(this.userId).subscribe(x => {
        this.user = x.payload.data();
        this.canAddVacancy = this.user.uid === this.authService.currentUserId && this.user.type === UserType.University;
        this.canAddFacility = this.user.uid === this.authService.currentUserId && this.user.type === UserType.University;
        this.canAddPost = this.user.uid === this.authService.currentUserId;
        this.canEditInfo = this.user.uid === this.authService.currentUserId;
        this.isStudent = this.user.type == UserType.Student;
        this.isProfessor = this.user.type == UserType.Professor;
        if (this.user.tags) {
          this.userTags = this.user.tags.join();
        }
        this.getItems();
      });
    });
  }

  getItems() {
    this.itemsService.getUserItems(this.user.uid).subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
      console.log(this.items);
      this.isLoading = false;
    });
  }

  saveUserData() {
    return this.authService.updateUser(this.user);
  }

  addVacancy() {
    this.vacancyToAdd.type = ItemType.Vacancy;
    this.vacancyToAdd.user = this.authService.currentUser;
    this.vacancyToAdd.tags = this.vacancyToAddTags.split(',');
    this.vacancyToAdd.createDate = Date.now();
    this.itemsService.createItem(this.vacancyToAdd);
  }

  addFacility() {
    this.facilityToAdd.type = ItemType.Facility;
    this.facilityToAdd.user = this.authService.currentUser;
    this.facilityToAdd.tags = this.facilityToAddTags.split(',');
    this.facilityToAdd.createDate = Date.now();
    this.itemsService.createItem(this.facilityToAdd);
  }

  changeCover() {
    this.statService.missingFeature('user-changeCover');
  }

  updateSkills() {
    this.user.tags = this.userTags.split(',');
    this.saveUserData();
  }

  addPost() {
    this.postToAdd.type = ItemType.Post;
    this.postToAdd.user = this.authService.currentUser;
    this.postToAdd.createDate = Date.now();
    this.itemsService.createItem(this.postToAdd);
  }

  updateKnowledge() {
    this.user.knowledge = this.userKnowledge.split(',');
    this.saveUserData();
  }

  updateInterests() {
    this.user.interests = this.userInterests.split(',');
    this.saveUserData();
  }

  addExperience() {
    this.user.experience.push(this.experienceToAdd);
    this.saveUserData().then(res => {
      this.experienceToAdd = new UserExperiance();
    });
  }

  removeExperience(item: UserExperiance) {
    this.user.experience.splice(this.user.experience.indexOf(item), 1);
    this.saveUserData();
  }

  addAccomplishment() {
    this.user.accomplishment.push(this.accomplishmentToAdd);
    this.saveUserData().then(res => {
      this.accomplishmentToAdd = new UserExperiance();
    });
  }

  removeAccomplishment(item: UserExperiance) {
    this.user.accomplishment.splice(this.user.accomplishment.indexOf(item), 1);
    this.saveUserData();
  }
}
