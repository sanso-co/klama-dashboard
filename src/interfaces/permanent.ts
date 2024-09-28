import { LeanShowType, Show } from "./show";

export interface List {
    _id?: string;
    releaseDate: string;
    shows: Show[];
}

export interface Permanent {
    _id?: string;
    name: string;
    description?: string;
    shows?: {
        result: LeanShowType[];
    };
}
