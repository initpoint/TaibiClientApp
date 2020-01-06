import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../../modules/shared-module.module';
import { FooterComponent } from './footer.component';
import { Routes, RouterModule } from '@angular/router';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  entryComponents: [
    FooterComponent
  ],
  exports : [
    FooterComponent
  ]
})

export class FooterModule {
  
}
