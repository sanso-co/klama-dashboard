import { CreditType } from "./credit";

export interface OriginalWorkType {
    title: string;
    original_title: string;
    author: CreditType;
    type: string;
    hasOriginalWork?: boolean;
}
