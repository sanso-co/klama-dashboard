import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Credit } from "@/interfaces/credit";

interface CollectionProps {
    credits: Credit[];
    creditDetails: Credit | null;
    setCredit: (credit: Credit[]) => void;
    setCreditDetails: (details: Credit | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
}

export const useCreditStore = create<CollectionProps>()(
    devtools(
        (set) => ({
            credits: [],
            creditDetails: null,
            setCredit: (credits) => set({ credits }),
            isLoading: false,
            setCreditDetails: (creditDetails) => set({ creditDetails }),
            setIsLoading: (loading) => set({ isLoading: loading }),
            error: null,
            setError: (error) => set({ error }),
        }),
        {
            name: "credit",
        }
    )
);
