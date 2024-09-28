import { Show } from "./show";

export interface List {
    _id?: string;
    releaseDate: string;
    shows: Show[];
}

export interface Periodic {
    _id?: string;
    name: string;
    description?: string;
    frequency: string;
    lists?: List[];
}
