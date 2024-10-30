import { LeanShowType } from "./show";

export interface CollectionListType {
    _id: string;
    releaseDate: string;
    shows: LeanShowType[];
}

export interface PeriodicType {
    _id: string;
    name: string;
    description?: string;
    frequency: string;
    lists: CollectionListType[];
}
