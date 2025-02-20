import { CreditType } from "./credit";

export interface OriginalWorkType {
    title: string;
    original_title: string;
    authorId: string;
    type: string;
}

export interface OriginalWorkResponseType {
    _id: string;
    title: string;
    original_title: string;
    author: CreditType;
    type: string;
    hasOriginalWork: boolean;
}
