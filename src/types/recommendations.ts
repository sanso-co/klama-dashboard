import { LeanShowType } from "./show";

export interface RecommendationsShow {
    id: number;
    details: {
        name: string;
        original_name: string;
        poster_path: string;
    };
}

export interface RecommendationsResponse {
    _id: string;
    id: number;
    details: string;
    shows: LeanShowType[];
}
