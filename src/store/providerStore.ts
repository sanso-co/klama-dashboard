import { create } from "zustand";
import { ProviderType } from "@/types/provider";

interface ProviderProps {
    collections: ProviderType[];
    details: ProviderType | null;
    addProviderCollection: (collection: ProviderType) => void;
    setProviderCollections: (collections: ProviderType[]) => void;
    setProviderDetails: (details: ProviderType | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
}

export const useProviderStore = create<ProviderProps>((set) => ({
    collections: [],
    details: null,
    addProviderCollection: (collection) =>
        set((state) => ({
            collections: [...state.collections, collection],
        })),
    setProviderCollections: (collections) => set({ collections }),
    setProviderDetails: (details) => set({ details }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
}));
