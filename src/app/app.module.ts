import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './shared/components/layout/layout.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {SideMenuComponent} from './shared/components/side-menu/side-menu.component';
import {LoginComponent} from './pages/login/login.component';
import {NotifierModule} from 'angular-notifier';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterModule} from './shared/components/footer/footer.module';
import {JwtModule} from '@auth0/angular-jwt';
import {JwtInterceptor} from './shared/services/jwt-interceptor.service';


import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import {ProfileComponent} from './pages/directories/profile/profile.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';

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
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
