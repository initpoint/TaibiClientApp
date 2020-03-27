import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginVM} from '../models/login.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser, UserType} from '../models/user.model';
import {RegisterVM} from '../models/register.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';

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
  updateUser(user: AppUser) {
    Object.keys(user).forEach(key => user[key] === undefined ? delete user[key] : {});
    if (user.experience) {
      user.experience.map(item => Object.keys(item).forEach(key => item[key] === undefined ? delete item[key] : {}));
    }
    if (user.accomplishment) {
      user.accomplishment.map(item => Object.keys(item).forEach(key => item[key] === undefined ? delete item[key] : {}));
    }

    const o = {experience: [], accomplishment: []};
    Object.keys(user).map(key => {
      if (key === 'experience') {
        o['experience'] = user.experience.map(item => ({...item}));
      } else if (key === 'accomplishment') {
        o['accomplishment'] = user.accomplishment.map(item => ({...item}));
      } else {
        o[key] = user[key];
      }
    });

    return this.db.doc('users/' + user.uid).update(o).then(res => {
      this.toastrService.success('User Info Updated.');
    });
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

  createUser(user: AppUser) {
    Object.keys(user).forEach(key => user[key] === undefined && delete user[key]);
    const o = {};
    Object.keys(user).map(key => o[key] = user[key]);
    return this.db.doc('users/' + user.uid).set(o).then(res => {
      this.toastrService.success('User Created.');
    });
  }
  getUsersByType(type: UserType) {
    return this.db.collection<AppUser>('users',ref => ref.where('type','==',type.toString())).snapshotChanges().pipe(
        map(x => x.map(y => {
          return {
            uid: y.payload.doc.id,
            ...y.payload.doc.data()
          };
        }))
    );
  }
  getUsers() {
    return this.db.collection<AppUser>('users').snapshotChanges().pipe(
      map(x => x.map(y => {
        return {
          uid: y.payload.doc.id,
          ...y.payload.doc.data()
        };
      }))
    );
  }

  getFollowers(uid: string) {
    return this.db.collection<AppUser>('users',
      ref => ref.where('followingIds', 'array-contains', uid)).snapshotChanges().pipe(
      map(x => x.map(y => {
        return {
          uid: y.payload.doc.id,
          ...y.payload.doc.data()
        };
      }))
    );
  }

  getFollowings(uid: string) {
    return this.db.collection<AppUser>('users',
      ref => ref.where('followersIds', 'array-contains', uid)).snapshotChanges().pipe(
      map(x => x.map(y => {
        return {
          uid: y.payload.doc.id,
          ...y.payload.doc.data()
        };
      }))
    );
  }

  followUser(uid: string) {
    if (!this.currentUser.followingIds) {
      this.currentUser.followingIds = [];
    }
    this.currentUser.followingIds.push(uid);
    this.updateUser(this.currentUser).then(() => {
      this.db.doc(`users/${uid}`).set({followersIds: firebase.firestore.FieldValue.arrayUnion(this.currentUserId)}, {merge: true})
        .then(() => {
          this.toastrService.success('Following User.');
        });
    });
  }

  unfollowUser(uid: string) {
    this.currentUser.followingIds.splice(this.currentUser.followingIds.indexOf(uid), 1);
    this.updateUser(this.currentUser).then(() => {
      this.db.doc(`users/${uid}`).set({followersIds: firebase.firestore.FieldValue.arrayRemove(this.currentUserId)}, {merge: true})
        .then(() => {
          this.toastrService.success('Unfollowing User.');
        });
    });
  }
}
