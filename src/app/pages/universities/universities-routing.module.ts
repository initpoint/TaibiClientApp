import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversitiesComponent } from './universities.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: UniversitiesComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversitiesRoutingModule { }
