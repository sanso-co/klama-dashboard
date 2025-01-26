import { create } from "zustand";
import { PeriodicType } from "@/types/periodic";

interface PeriodicProps {
    collections: PeriodicType[];
    details: PeriodicType | null;
    addPeriodicCollection: (collection: PeriodicType) => void;
    setPeriodicCollections: (collections: PeriodicType[]) => void;
    setPeriodicDetails: (details: PeriodicType | null) => void;
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
