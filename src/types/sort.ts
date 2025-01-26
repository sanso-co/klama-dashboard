import { SortEnum } from "@/helpers/constants/options";

export interface OptionType {
    name: string;
    value: SortEnum;
}

export type SortType = "name_asc" | "original_name_asc" | "date_asc" | "date_desc";
