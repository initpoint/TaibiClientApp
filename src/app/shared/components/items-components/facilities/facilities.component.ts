import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FacilityReservation, FacilitySlot, Item, ItemType} from 'src/app/shared/models/items.model';
import {AuthService} from '../../../services/auth.service';
import {ItemsService} from '../../../services/Items.service';
import {AppUser, UserType} from '../../../models/user.model';
import {StatService} from '../../../services/stat.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  @Input() item: Item;

  canViewReservations = false;
  slotToAdd: FacilitySlot = new FacilitySlot();

  constructor(public authService: AuthService, public itemsService: ItemsService, public statService: StatService) {
  }

  ngOnInit() {
    this.canViewReservations = this.item.user.uid === this.authService.currentUserId;
  }

  book(e: MouseEvent, slot: FacilitySlot, comment) {
    this.item.slots.find(s => s.id === slot.id).isReserved = true;
    const reservation: FacilityReservation = {
      user: this.authService.currentUser,
      slotId: slot.id,
      date: slot.date,
      title: slot.title,
      comment: comment.value,
    };
    if (this.item.reservations) {
      this.item.reservations.push(reservation);
    } else {
      this.item.reservations = [reservation];
    }
    this.itemsService.updateItem(this.item);
  }

  removeSlot(e: MouseEvent, slot: FacilitySlot) {
    // @ts-ignore
    this.item.slots.splice(this.item.slots.indexOf((s: FacilitySlot) => {
      const innerSlot = s as FacilitySlot;
      return innerSlot.id === slot.id;
    }), 1);
    this.itemsService.updateItem(this.item);
  }

  print() {
    this.statService.missingFeature('print-facilityReservations');
  }


  addSlot() {
    if (this.item.slots) {
      this.item.slots.push(this.slotToAdd);
    } else {
      this.item.slots = [this.slotToAdd];
    }
    this.itemsService.updateItem(this.item);
    this.slotToAdd = new FacilitySlot();
  }

}
