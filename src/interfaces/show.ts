import { Credit } from "./credit";
import { Keyword } from "./keyword";

export interface CustomShow {
    id: string;
    name: string;
    poster_path: string;
    youtube_keywords: string[];
}

export interface Show {
    _id?: string;
    id: number;
    name: string;
    original_name: string;
    poster_path: {
        [key: string]: {
            path: string;
        };
    };
    genres: {
        id: number;
        name: string;
    }[];
    overview: string;
    first_air_date: string;
    number_of_episodes: number;
    homepage: string;
    networks: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
    production_companies: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
    created_by: {
        id: number;
        name: string;
        original_name: string;
    }[];
    original_story?: {
        title: {
            title: string;
            korean_title: string;
        };
        author: {
            name: string;
            korean_name: string;
        };
    };
}

export interface LeanShowType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    poster_path: {
        [key: string]: {
            path: string;
        };
    };
    first_air_date: string;
    popularity_score: number;
}

export interface ShowResponse {
    results: LeanShowType[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}
