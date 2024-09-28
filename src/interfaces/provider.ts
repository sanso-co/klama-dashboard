import { Show } from "./show";

export interface Provider {
    _id?: string;
    name: string;
    description?: string;
    shows?: {
        result: Show[];
    };
}
