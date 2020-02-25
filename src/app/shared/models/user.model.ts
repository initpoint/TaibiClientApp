export class AppUser {
  public constructor(
    public uid?: string,
    public name?: string,
    public email?: string,
    public jobTitle?: string,
    public createDate?: any,
    public usersLikeIds?: string[],
    public usersSharedIds?: string[],
    public usersViewedIds?: string[],
    public tags?: string[],
    public type?: UserType,
    public numberOfFollowing?: number,
    public numberOfFollowers?: number,
    public photoUrl?: string,
    public coverPhotoUrl?: string,
    public projectsPhotosUrls?: string[],
    public affiliatedUniversity?: string,
    public knowledge?: string[],
    public GPA?: string,
    public academicYear ?: string,
    public interests ?: string[],
    public experience ?: [],
    public bio ?: string,
    public accomplishment ?: [],
  ) {
  }
}


export enum UserType {
  All = '0',
  University = '1',
  Student = '2',
  Professor = '3'
}
