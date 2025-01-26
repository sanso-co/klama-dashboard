import { OptionType } from "@/types/sort";

export enum SortEnum {
    NameAsc = "name_asc",
    OriginalNameAsc = "original_name_asc",
    DateAsc = "date_asc",
    DateDesc = "date_desc",
}

export const sortOptions: OptionType[] = [
    {
        value: SortEnum.DateDesc,
        name: "Release Date (Newest)",
    },
    {
        value: SortEnum.DateAsc,
        name: "Release Date (Oldest)",
    },
    {
        value: SortEnum.NameAsc,
        name: "Alphabetical",
    },
];
