import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, from, BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginVM} from '../models/login.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser} from '../models/user.model';
import {RegisterVM} from '../models/register.model';
import {ItemsService} from './Items.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: AppUser;
  currentUserId: string;

  constructor(private http: HttpClient, public auth: AngularFireAuth, private db: AngularFirestore,
              private router: Router, private toastrService: ToastrService,
              private jwtHelper: JwtHelperService
  ) {
    this.updateCurrentUser();
  }

  updateCurrentUser() {
    return from(new Promise(resolve => {
      if (this.currentUser) {
        resolve();
      } else {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData['user_id']) {
          this.currentUserId = userData['user_id'];
          this.getUser(this.currentUserId).subscribe(userDoc => {
            this.currentUser = userDoc.payload.data();
            resolve();
          });
        }
      }
    }));
  }

  logout() {
    this.currentUserId = null;
    this.currentUser = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getUser(userId) {
    return this.db.collection<AppUser>('users', ref => ref.where('uid', '==', userId)).doc<AppUser>(userId).snapshotChanges();
  }

  updateItem(user: AppUser) {
    this.db.doc('users/' + user.uid).update(user);
  }

  login(model: LoginVM) {
    return from(new Promise(resolve => {
      this.auth.auth.signInWithEmailAndPassword(model.email, model.password).then(async res => {
        const token = await res.user.getIdToken();
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(this.jwtHelper.decodeToken(token)));
        this.toastrService.success('Login Successful. Loading User Data...');
        resolve(this.updateCurrentUser());
      }, error => {
        this.toastrService.error(error.message);
      });
    }));
  }

  register(model: RegisterVM): Observable<any> {
    const userAuthProimse = this.auth.auth.createUserWithEmailAndPassword(model.email, model.password);
    return from(userAuthProimse);
  }

}
