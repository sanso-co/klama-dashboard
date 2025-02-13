import { LeanShowType } from "./show";
import { PaginatedResponseType } from "./pagination";

export interface PermanentType extends PaginatedResponseType {
    _id: string;
    name: string;
    description?: string;
    results: LeanShowType[];
}
