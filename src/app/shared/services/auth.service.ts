import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {Config} from '../confing/config';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginVM} from '../models/login.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser} from '../models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import App = firebase.app.App;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: AppUser;
  currentUserId: string;

  constructor(private http: HttpClient, public auth: AngularFireAuth, public db: AngularFirestore, public jwtHelper: JwtHelperService) {
    this.updateCurrentUser();
  }

  updateCurrentUser() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData['user_id']) {
      this.currentUserId = userData['user_id'];
      this.getUser(this.currentUserId).subscribe(userDoc => {
        this.currentUser = userDoc.payload.data() as AppUser;
      });
    }
  }

  getUser(userId) {
    return this.db.collection<AppUser>('users').doc(userId).snapshotChanges();
  }

  login(model: LoginVM) {
    const userAuthProimse = this.auth.auth.signInWithEmailAndPassword(model.email, model.password);
    return from(userAuthProimse);
  }

  register(registerModel: any): Observable<any> {
    return this.http.post<any>(Config.Register, registerModel);
  }

}
