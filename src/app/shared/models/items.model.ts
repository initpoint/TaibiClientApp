export class Item {
    public constructor(
        public commnets?: string[],
        public content?: string,
        public createDate?: Date,
        public usersLikeIds?: string[],
        public usersSharedIds?: string[],
        public usersViewedIds?: string[],
        public tags?: string[],
        public type?: ItemType,
        public user?: AppUser
    ) { }
}

export class AppUser {
    public constructor(
        public id?: string,
        public name?: string,
        public photoUrls?: string,
    ) { }
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