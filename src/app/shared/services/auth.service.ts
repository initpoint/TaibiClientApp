import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {Config} from '../confing/config';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginVM} from '../models/login.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser} from '../models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: AppUser = {};
  currentUserId: string;

  constructor(private http: HttpClient, public auth: AngularFireAuth, public db: AngularFirestore, public jwtHelper: JwtHelperService) {
    this.updateCurrentUser();
  }

  updateCurrentUser() {
    const token = localStorage.getItem('token');
    this.currentUserId = this.jwtHelper.decodeToken(token)['user_id'];
    this.getUser(this.currentUserId).subscribe(userDoc => {
      this.currentUser = userDoc.payload.data();
    });
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
