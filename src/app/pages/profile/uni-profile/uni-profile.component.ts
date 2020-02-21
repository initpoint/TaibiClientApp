import {Component, Input, OnInit} from '@angular/core';
import {AppUser} from '../../../shared/models/user.model';

@Component({
  selector: 'app-uni-profile',
  templateUrl: './uni-profile.component.html',
  styleUrls: ['./uni-profile.component.scss']
})
export class UniProfileComponent implements OnInit {
  @Input() user: AppUser;

  constructor() {
  }

  ngOnInit() {
  }

}
