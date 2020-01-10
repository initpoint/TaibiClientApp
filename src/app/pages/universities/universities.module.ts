import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversitiesRoutingModule } from './universities-routing.module';
import { UniversitiesComponent } from '../universities/universities.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [UniversitiesComponent, ProfileComponent],
  imports: [
    CommonModule,
    UniversitiesRoutingModule
  ]
})
export class UniversitiesModule { }
