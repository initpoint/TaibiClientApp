import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from 'src/app/shared/modules/shared-module.module';
import { UniversitiesPostsComponent } from './items-components/universities-posts/universities-posts.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { VacanciesComponent } from './items-components/vacancies/vacancies.component';
import { LiftSideFilterComponent } from './lift-side-filter/lift-side-filter.component';
import { FacilitiesComponent } from './items-components/facilities/facilities.component';
import { ItemsComponentsComponent } from './items-components/items-components.component';


const routes: Routes = [
  { path: '', component: DashbordComponent },
  { path: 'items', component: LoaderComponent }
]

@NgModule({
  declarations: [
    DashbordComponent,
    UniversitiesPostsComponent,
    FacilitiesComponent,
    RightSidebarComponent,
    LoaderComponent,
    VacanciesComponent,
    LiftSideFilterComponent,
    ItemsComponentsComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class DashbordModule { }
