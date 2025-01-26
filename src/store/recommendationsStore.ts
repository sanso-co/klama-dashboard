import { create } from "zustand";
import { RecommendationsResponse } from "@/types/recommendations";

interface RecommendationsProps {
    details: RecommendationsResponse | null;
    setRecommendationDetails: (details: RecommendationsResponse | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
}

export const useRecommendationsStore = create<RecommendationsProps>((set) => ({
    details: null,
    setRecommendationDetails: (details) => set({ details }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
}));
