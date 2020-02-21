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


  constructor(public db: AngularFirestore, public toastrService: ToastrService) {
  }

  getItems() {
    return this.db.collection<Item>('items').snapshotChanges();
  }

  getUserItems(currentUserId: string) {
    return this.db.collection<Item>('items', ref => ref.where('uid', '==', currentUserId)).snapshotChanges();
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
    this.db.doc('items/' + item.id).update(item).then(res => {
      this.toastrService.success('Item Updated.');
    });
  }

  deleteItem(itemId: string) {
    this.db.doc('items/' + itemId).delete();
  }
}
