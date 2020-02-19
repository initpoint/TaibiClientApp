import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { SharedModuleModule } from 'src/app/shared/modules/shared-module.module';


@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    MyProfileRoutingModule
  ]
})
export class MyProfileModule { }
