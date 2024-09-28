import { create } from "zustand";
import { Permanent } from "@/interfaces/permanent";

interface PermanentProps {
    collections: Permanent[];
    details: Permanent | null;
    addPermanentCollection: (collection: Permanent) => void;
    setPermanentCollections: (collections: Permanent[]) => void;
    setPermanentDetails: (details: Permanent | null) => void;
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
