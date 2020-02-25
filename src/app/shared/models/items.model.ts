import {AppUser} from './user.model';

export class Item {
  public constructor(
    public description: string = '',
    public title: string = '',
    public tags: string[] = [],
    public user?: AppUser,
    public id?: string,
    public comments: string[] = [],
    public createDate?: any,
    public usersLikeIds?: string[],
    public usersSharedIds?: string[],
    public usersViewedIds?: string[],
    public type?: ItemType,
    public usersApplyIds: string[] = [],
    public slots: FacilitySlot[] = [],
    public reservations: FacilityReservation[] = [],
    public approvedApplicant?: AppUser
  ) {
  }
}

export class FacilitySlot {
  public constructor(
    public isReserved?: boolean,
    public date?: any,
    public durationInMinutes?: number,
    public fullDay?: boolean,
    public contactPerson?: string,
    public title?: string,
    public id?: string,
  ) {
  }
}

export class FacilityReservation {
  public constructor(
    public user: AppUser,
    public slotId?: string,
    public date?: any,
    public title?: string,
    public comment?: string,
  ) {
  }
}

export enum ItemType {
  All,
  Vacancy,
  Grant,
  Event,
  Facility,
  Program,
  Post
}
