export interface KeywordType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    rank: number;
}

export interface KeywordsForShowType {
    id: string;
    results: KeywordType[];
}
