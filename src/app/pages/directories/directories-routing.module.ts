import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DirectoriesComponent} from './directories.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: '', component: DirectoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoriesRoutingModule {
}
