import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public db: AngularFirestore) {
  }

  getUsers() {
    return this.db.collection<AppUser>('users').snapshotChanges();
  }

  getUserById(userId: string) {
    return this.db.doc<AppUser>('users/' + userId).snapshotChanges();
  }

  createUser(user: AppUser) {
    return this.db.collection('users').add(user);
  }

  updateUser(user: AppUser) {
    this.db.doc('users/' + user.uid).update(user);
  }

  deleteUser(userId: string) {
    this.db.doc('users/' + userId).delete();
  }
}
