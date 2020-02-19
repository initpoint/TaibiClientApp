import {Component, OnInit, Input} from '@angular/core';
import {FacilityReservation, FacilitySlot, Item} from 'src/app/shared/models/items.model';
import {AuthService} from '../../../services/auth.service';
import {ItemsService} from '../../../services/Items.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  @Input() item: Item = new Item();


  constructor(public authService: AuthService, public itemsService: ItemsService) {

  }

  ngOnInit() {
    console.log('item form facilities', this.item);
  }

  book(e: MouseEvent, slot: FacilitySlot, comment: string = '') {
    this.item.slots.find(s => s.id === slot.id).isReserved = true;
    const reservation: FacilityReservation = {
      userId: this.authService.auth.auth.currentUser.uid,
      slotId: slot.id,
      date: slot.date,
      title: slot.title,
      comment: comment,
    };
    if (this.item.reservations) {
      this.item.reservations.push(reservation);
    } else {
      this.item.reservations = [reservation];
    }
    console.log(this.item);
    this.itemsService.updateItem(this.item);
  }
}
