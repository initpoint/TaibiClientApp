import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {Config} from '../confing/config';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginVM} from '../models/login.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: AppUser;

  constructor(private http: HttpClient, public auth: AngularFireAuth, public db: AngularFirestore) {
  }

  getCurrentUser() {
    return this.getUser(this.auth.auth.currentUser.uid);
  }

  getUser(userId) {
    return this.db.collection<AppUser>('users').doc(userId).snapshotChanges();
  }

  login(model: LoginVM) {
    const userAuthProimse = this.auth.auth.signInWithEmailAndPassword(model.email, model.password);
    // userAuthProimse.then(res => {
    //   this.getCurrentUser().subscribe(userDoc => {
    //     this.currentUser = userDoc.payload.data();
    //   });
    // });
    return from(userAuthProimse);
  }

  register(registerModel: any): Observable<any> {
    return this.http.post<any>(Config.Register, registerModel);
  }

}
