import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Keyword } from "@/interfaces/keyword";

interface CollectionProps {
    keywords: Keyword[];
    keywordDetails: Keyword | null;
    setKeywords: (keywords: Keyword[]) => void;
    setKeywordDetails: (details: Keyword | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
}

export const useKeywordsStore = create<CollectionProps>()(
    devtools(
        (set) => ({
            keywords: [],
            keywordDetails: null,
            setKeywords: (keywords) => set({ keywords }),
            isLoading: false,
            setKeywordDetails: (keywordDetails) => set({ keywordDetails }),
            setIsLoading: (loading) => set({ isLoading: loading }),
            error: null,
            setError: (error) => set({ error }),
        }),
        {
            name: "keywords",
        }
    )
);
