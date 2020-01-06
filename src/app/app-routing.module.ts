import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './shared/components/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/dashbord', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [
      // pages route
      { path: 'dashbord', loadChildren: () => import('./pages/dashbord/dashbord.module').then(m => m.DashbordModule), canActivate: [AuthGuard] },
      { path: 'my-profile', loadChildren: () => import('./pages/user-managment/my-profile/my-profile.module').then(m => m.MyProfileModule), canActivate: [AuthGuard] },
      { path: 'super-admins', loadChildren: () => import('./pages/super-admins/super-admins.module').then(m => m.SuperAdminsModule), canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '/dashbord', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
