import { LeanShowType } from "./show";

export interface PermanentType {
    _id: string;
    name: string;
    description?: string;
    results: LeanShowType[];
}
