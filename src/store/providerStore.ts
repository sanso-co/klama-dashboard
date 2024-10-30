import { create } from "zustand";
import { ProviderResponseType } from "@/interfaces/provider";

interface ProviderProps {
    collections: ProviderResponseType[];
    details: ProviderResponseType | null;
    addProviderCollection: (collection: ProviderResponseType) => void;
    setProviderCollections: (collections: ProviderResponseType[]) => void;
    setProviderDetails: (details: ProviderResponseType | null) => void;
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
