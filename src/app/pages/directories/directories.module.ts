import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DirectoriesRoutingModule} from './directories-routing.module';
import {DirectoriesComponent} from '../directories/directories.component';
import {ProfileComponent} from './profile/profile.component';


@NgModule({
  declarations: [DirectoriesComponent],
  imports: [
    CommonModule,
    DirectoriesRoutingModule,
  ]
})
export class DirectoriesModule {
}
