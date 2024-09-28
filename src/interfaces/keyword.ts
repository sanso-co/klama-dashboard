import { Show } from "./show";

export interface Keyword {
    _id: string;
    id: number;
    name: string;
    original_name?: string;
    rank: number;
}

export interface KeywordResponse {
    _id: string;
    id: number;
    name: string;
    original_name?: string;
    rank?: number;
    shows: Show[];
}

export interface ShowKeywords {
    id: string;
    results: Keyword[];
}
