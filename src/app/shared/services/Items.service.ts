import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Item, ItemType} from '../models/items.model';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  currentItemType = new BehaviorSubject(ItemType.All);
  searchInItemsKeyWord = new BehaviorSubject('');
  searchByTag = new BehaviorSubject('');


  constructor(public db: AngularFirestore, public toastrService: ToastrService) {
  }

  getItems() {
    return this.db.collection<Item>('items').snapshotChanges();
  }

  getUserItems(userId: string) {
    return this.db.collection<Item>('items', ref => ref.where('user.uid', '==', userId)).snapshotChanges();
  }

  createItem(item: Item) {
    Object.keys(item).forEach(key => item[key] === undefined ? delete item[key] : {});
    Object.keys(item.user).forEach(key => item.user[key] === undefined ? delete item.user[key] : {});
    const o = {user: {}};
    Object.keys(item).map(key => {
      if (key === 'user') {
        o['user'] = {...item.user};
      } else {
        o[key] = item[key];
      }
    });
    this.db.collection('items').add(o).then(res => {
      this.toastrService.success('Item Added.');
    });
  }

  updateItem(item: Item) {
    Object.keys(item).forEach(key => item[key] === undefined ? delete item[key] : {});
    Object.keys(item.user).forEach(key => item.user[key] === undefined ? delete item.user[key] : {});
    if (item.approvedApplicant) {
      Object.keys(item.approvedApplicant).forEach(key => item.approvedApplicant[key] === undefined ? delete item.approvedApplicant[key] : {});
    }
    item.slots.map(slot => {
      Object.keys(slot).forEach(key => slot[key] === undefined ? delete slot[key] : {});
    });
    item.reservations.map(reservation => {
      Object.keys(reservation).forEach(key => reservation[key] === undefined ? delete reservation[key] : {});
      Object.keys(reservation.user).forEach(key => reservation.user[key] === undefined ? delete reservation.user[key] : {});
    });

    const o = {user: {}, slots: [], reservations: [], approvedApplicant: {}};
    Object.keys(item).map(key => {
      if (key === 'user') {
        o['user'] = {...item.user};
      } else if (key === 'approvedApplicant') {
        o['approvedApplicant'] = {...item.approvedApplicant};
      } else if (key === 'slots') {
        o['slots'] = item.slots.map(slot => {
          return {...slot};
        });
      } else if (key === 'reservations') {
        o['reservations'] = item.reservations.map(reservation => {
          const resO = {user: {}};
          Object.keys(reservation).map(resKey => {
            if (resKey === 'user') {
              resO['user'] = {...reservation.user};
            } else {
              resO[resKey] = reservation[resKey];
            }
          });
          return {...resO};
        });
      } else {
        o[key] = item[key];
      }
    });
    return this.db.doc('items/' + item.id).set(o).then((res) => {
      this.toastrService.success('Item Updated.');
    });
  }

  deleteItem(itemId: string) {
    this.db.doc('items/' + itemId).delete();
  }
}
