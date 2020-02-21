import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {SharedModuleModule} from 'src/app/shared/modules/shared-module.module';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MyProfileComponent} from './my-profile/my-profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserProfileComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule {
}
