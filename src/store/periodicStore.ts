import { create } from "zustand";
import { Periodic } from "@/interfaces/periodic";

interface PeriodicProps {
    collections: Periodic[];
    details: Periodic | null;
    addPeriodicCollection: (collection: Periodic) => void;
    setPeriodicCollections: (collections: Periodic[]) => void;
    setPeriodicDetails: (details: Periodic | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
}

export const usePeriodicStore = create<PeriodicProps>((set) => ({
    collections: [],
    details: null,
    addPeriodicCollection: (collection) =>
        set((state) => ({
            collections: [...state.collections, collection],
        })),
    setPeriodicCollections: (collections) => set({ collections }),
    setPeriodicDetails: (details) => set({ details }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
}));
