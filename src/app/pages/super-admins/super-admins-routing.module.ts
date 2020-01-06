import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminsComponent } from './super-admins.component';


const routes: Routes = [
  { path: '', component: SuperAdminsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminsRoutingModule { }
