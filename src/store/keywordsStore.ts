import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { KeywordType } from "@/types/keyword";

interface CollectionProps {
    keywords: KeywordType[];
    keywordDetails: KeywordType | null;
    setKeywords: (keywords: KeywordType[]) => void;
    setKeywordDetails: (details: KeywordType | null) => void;
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
