import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminsRoutingModule } from './super-admins-routing.module';
import { SuperAdminsComponent } from './super-admins.component';


@NgModule({
  declarations: [SuperAdminsComponent],
  imports: [
    CommonModule,
    SuperAdminsRoutingModule
  ]
})
export class SuperAdminsModule { }
