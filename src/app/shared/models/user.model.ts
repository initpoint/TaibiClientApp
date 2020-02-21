import {Item} from './items.model';

export class AppUser {
  public constructor(
    public uid?: string,
    public name?: string,
    public email?: string,
    public descirption?: string,
    public jobTitle?: string,
    public createDate?: any,
    public usersLikeIds?: string[],
    public usersSharedIds?: string[],
    public usersViewedIds?: string[],
    public tags?: string[],
    public type?: UserType,
    public numberOfFollowing?: number,
    public numberOfFollowers?: number,
    public items?: Item,
    public photoUrl?: string,
    public coverPhotoUrl?: string,
    public projectsPhotosUrls?: string[],
  ) {
  }
}


export enum UserType {
  All,
  University,
  Student
}

export enum ProfileType {
  Nothing,
  University,
  Student,
  CurrentUniversity,
  CurrentStudent,
}
