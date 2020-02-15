import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from 'src/app/shared/modules/shared-module.module';
import { AppModule } from 'src/app/app.module';
import { UniversitiesPostsComponent } from './universities-posts/universities-posts.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { TagsSecComponent } from './tags-sec/tags-sec.component';
import { LoaderComponent } from './loader/loader.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { LiftSideFilterComponent } from './lift-side-filter/lift-side-filter.component';


const routes: Routes = [
  { path: '', component: DashbordComponent }
]

@NgModule({
  declarations: [
    DashbordComponent,
    UniversitiesPostsComponent,
    RightSidebarComponent,
    UserProfileComponent,
    SuggestionsComponent,
    TagsSecComponent,
    LoaderComponent,
    VacanciesComponent,
    LiftSideFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
		RouterModule.forChild(routes)
  ]
})
export class DashbordModule { }
