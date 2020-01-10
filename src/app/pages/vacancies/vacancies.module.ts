import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';


@NgModule({
  declarations: [VacanciesComponent],
  imports: [
    CommonModule,
    VacanciesRoutingModule
  ]
})
export class VacanciesModule { }
