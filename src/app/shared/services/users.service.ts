import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppUser} from '../models/user.model';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public db: AngularFirestore, public toastrService: ToastrService) {
  }

  getUsers() {
    return this.db.collection<AppUser>('users').snapshotChanges();
  }

  getUserById(userId: string) {
    return this.db.doc<AppUser>('users/' + userId).snapshotChanges();
  }

  createUser(user: AppUser) {
    return this.db.doc('users/' + user.uid).set(user).then(res => {
      this.toastrService.success('User Created.');
    });
  }

  updateUser(user: AppUser) {
    this.db.doc('users/' + user.uid).update(user);
  }

  deleteUser(userId: string) {
    this.db.doc('users/' + userId).delete();
  }
}
