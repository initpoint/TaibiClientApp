import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversitiesRoutingModule } from './universities-routing.module';
import { UniversitiesComponent } from '../universities/universities.component';


@NgModule({
  declarations: [UniversitiesComponent],
  imports: [
    CommonModule,
    UniversitiesRoutingModule
  ]
})
export class UniversitiesModule { }
