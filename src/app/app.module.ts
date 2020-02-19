import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './shared/components/layout/layout.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {SideMenuComponent} from './shared/components/side-menu/side-menu.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './shared/components/register/register.component';
import {NotifierModule} from 'angular-notifier';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterModule} from './shared/components/footer/footer.module';
import {JwtModule} from '@auth0/angular-jwt';
import {JwtInterceptor} from './shared/services/jwt-interceptor.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from 'src/environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {ProfileComponent} from './pages/directories/profile/profile.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    SideMenuComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  exports: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    SideMenuComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifierModule,
    HttpClientModule,
    FormsModule,
    FooterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AngularFirestore,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
