export interface All {
    paintings: IPaintings;
    authors: IAuthors;
    locations: ILocations;
    dates: IDates;
}
export interface IPaintings {
    authorId: number;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
}
export interface IAuthors {
    id: number;
    name: string;
}
export interface ILocations {
    id: number;
    location: string;
}
export interface IDates {
    startDate: string;
    endDate: string;
}


