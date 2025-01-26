export interface CreditType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    job: string;
}

export interface CreditsForShowType {
    id: string;
    results: CreditType[];
}
