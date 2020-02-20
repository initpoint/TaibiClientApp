import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashbordComponent} from './dashbord.component';
import {Routes, RouterModule} from '@angular/router';
import {SharedModuleModule} from 'src/app/shared/modules/shared-module.module';


const routes: Routes = [
  {path: '', component: DashbordComponent}
];

@NgModule({
  declarations: [
    DashbordComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class DashbordModule {
}
