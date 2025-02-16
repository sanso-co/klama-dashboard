import { SortType } from "@/types/sort";

export const MENU = [
    {
        name: "Periodic Collection",
        url: "/periodic-collection",
    },
    {
        name: "Permanent Collection",
        url: "/permanent-collection",
    },
    {
        name: "Genre",
        url: "/genre",
    },
    {
        name: "Keywords",
        url: "/keywords",
    },
    {
        name: "Tone",
        url: "/tone",
    },
    {
        name: "Credit",
        url: "/credit",
    },
    {
        name: "Provider",
        url: "/provider",
    },
    {
        name: "Shows",
        url: "/shows",
    },
    {
        name: "Add Show",
        url: "/add",
    },
    {
        name: "Marketing",
        url: "/marketing",
    },
    {
        name: "About Company",
        url: "/profile",
    },
];

export const SORT: { name: string; value: SortType }[] = [
    {
        name: "Alphabetical",
        value: "name_asc",
    },
    {
        name: "Newest",
        value: "date_desc",
    },
];
