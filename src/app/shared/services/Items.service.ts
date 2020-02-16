import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Item } from '../models/items.model';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    constructor(public db: AngularFirestore) { }

    getItems() {
        return this.db.collection<Item>('items').snapshotChanges();
    }

    createItem(item: Item) {
        return this.db.collection('items').add(item);
    }

    updateItem(item: Item) {
        delete item.id;
        this.db.doc('items/' + item.id).update(item);
    }

    deleteItem(itemId: string) {
        this.db.doc('items/' + itemId).delete();
    }
}
