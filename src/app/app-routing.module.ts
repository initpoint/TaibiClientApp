import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {LayoutComponent} from './shared/components/layout/layout.component';
import {LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/dashbord', pathMatch: 'full'},
  {
    path: '', component: LayoutComponent,
    children: [
      // pages route
      {
        path: 'dashbord',
        loadChildren: () => import('./pages/dashbord/dashbord.module').then(m => m.DashbordModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'universities',
        loadChildren: () => import('./pages/universities/universities.module').then(m => m.UniversitiesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'directories',
        loadChildren: () => import('./pages/directories/directories.module').then(m => m.DirectoriesModule),
        canActivate: [AuthGuard]
      },
      {path: 'events', loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule), canActivate: [AuthGuard]},
      {
        path: 'profile/:id',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'super-admins',
        loadChildren: () => import('./pages/super-admins/super-admins.module').then(m => m.SuperAdminsModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {path: '**', redirectTo: '/dashbord', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
