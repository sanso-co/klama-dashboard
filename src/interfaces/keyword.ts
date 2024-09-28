export interface Keyword {
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
    rank: number;
}

export interface ShowKeywords {
    id: string;
    results: KeywordResponse[];
}
