import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CreditType } from "@/interfaces/credit";

interface CollectionProps {
    credits: CreditType[];
    creditDetails: CreditType | null;
    setCredit: (credit: CreditType[]) => void;
    setCreditDetails: (details: CreditType | null) => void;
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
