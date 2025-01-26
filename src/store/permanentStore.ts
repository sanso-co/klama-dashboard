import { create } from "zustand";
import { PermanentType } from "@/types/permanent";

interface PermanentProps {
    collections: PermanentType[];
    details: PermanentType | null;
    addPermanentCollection: (collection: PermanentType) => void;
    setPermanentCollections: (collections: PermanentType[]) => void;
    setPermanentDetails: (details: PermanentType | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
}

export const usePermanentStore = create<PermanentProps>((set) => ({
    collections: [],
    details: null,
    addPermanentCollection: (collection) =>
        set((state) => ({
            collections: [...state.collections, collection],
        })),
    setPermanentCollections: (collections) => set({ collections }),
    setPermanentDetails: (details) => set({ details }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
}));
