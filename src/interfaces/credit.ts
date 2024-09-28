export interface Credit {
    _id: string;
    id: number;
    name: string;
    original_name?: string;
    job: string;
}

export interface ShowCredits {
    id: string;
    results: Credit[];
}
