import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginVM} from '../models/login.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser} from '../models/user.model';
import { RegisterVM } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: AppUser;
  currentUserId: string;

  constructor(private http: HttpClient, public auth: AngularFireAuth, public db: AngularFirestore) {
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

  register(model: RegisterVM): Observable<any> {
    const userAuthProimse = this.auth.auth.createUserWithEmailAndPassword(model.email, model.password);
    return from(userAuthProimse);
  }

}
