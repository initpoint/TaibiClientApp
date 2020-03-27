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
  isFollowing = false;

  allUsers: AppUser[] = [];
  followers: AppUser[] = [];
  followings: AppUser[] = [];
  canViewUsers = false;
  canFollow = false;

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
        this.canEditInfo = this.user.uid === this.authService.currentUserId || this.user.type === UserType.Admin;
        this.canViewUsers = this.user.uid === this.authService.currentUserId && this.user.type === UserType.Admin;
        this.canFollow = this.user.uid !== this.authService.currentUserId;
        if (!this.user.followersIds) {
          this.user.followersIds = [];
        }
        this.isFollowing = this.user.followersIds.includes(this.authService.currentUserId);
        this.isStudent = this.user.type == UserType.Student;
        this.isProfessor = this.user.type == UserType.Professor;
        if (this.user.tags) {
          this.userTags = this.user.tags.join();
        }
        this.followers = [];
        this.followings = [];
        this.currentTab = 1;
        this.getItems();
      });
    });
  }

  getUsers() {
    this.authService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  getFollowers() {
    this.authService.getFollowers(this.user.uid).subscribe(users => {
      this.followers = users;
    });
  }

  getFollowings() {
    this.authService.getFollowings(this.user.uid).subscribe(users => {
      this.followings = users;
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

  follow() {
    if (this.isFollowing) {
      this.authService.unfollowUser(this.user.uid);
    } else {
      this.authService.followUser(this.user.uid);
    }
  }

  changeUserState(user: AppUser) {
    user.isActive = !user.isActive;
    this.statService.missingFeature('user-activate');
    this.authService.updateUser(user);
  }
}
