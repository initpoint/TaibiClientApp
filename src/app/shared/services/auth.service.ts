import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {Config} from '../confing/config';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginVM} from '../models/login.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser, Item} from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public auth: AngularFireAuth, public db: AngularFirestore) {
  }

  getCurrentUser() {
    return this.db.collection<AppUser>('users').doc(this.auth.auth.currentUser.uid)
      .snapshotChanges();
  }

  login(model: LoginVM) {
    const userAuthProimse = this.auth.auth.signInWithEmailAndPassword(model.email, model.password);
    return from(userAuthProimse);
  }

  register(registerModel: any): Observable<any> {
    return this.http.post<any>(Config.Register, registerModel);
  }

}
