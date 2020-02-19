export class Item {
  public constructor(
    public id?: string,
    public commnets?: string[],
    public descirption?: string,
    public vacanciesTitle?: string,
    public createDate?: any,
    public usersLikeIds?: string[],
    public usersSharedIds?: string[],
    public usersViewedIds?: string[],
    public tags?: string[],
    public type?: ItemType,
    public user: AppUser = new AppUser(),
    public usersApplyIds?: string[],
  ) {
  }
}

export class AppUser {
  public constructor(
    public id?: string,
    public name?: string,
    public photoUrl?: string,
    public type?: UserType,
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

export enum UserType {
  Student,
  University,
  Faculty,
}
