import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {SharedModuleModule} from 'src/app/shared/modules/shared-module.module';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule {
}
