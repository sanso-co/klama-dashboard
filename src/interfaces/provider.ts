import { ShowType } from "./show";

export interface ProviderType {
    _id: string;
    id: number;
    name: string;
    logo_path: string;
    display_priority: number;
    shows: ShowType[];
}
