import { useCallback, useEffect, useState } from "react";
import { useCreditStore } from "@/store/creditStore";
import { apiService } from "@/services/api";
import { Credit, ShowCredits } from "@/interfaces/credit";

export const useCreateCredit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createCredit = useCallback(
        async (credit: Credit) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.createCredit(credit);
                return response;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { createCredit, isLoading, error };
};

export const useGetAllCredits = () => {
    const { setCredit, setIsLoading, setError, isLoading, error, credits } = useCreditStore();

    const getAllCredits = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedKeywords = await apiService.getAllCredits();
            setCredit(fetchedKeywords);
            return fetchedKeywords;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setCredit, setIsLoading, setError]);

    useEffect(() => {
        getAllCredits();
    }, [getAllCredits]);

    return { credits, refreshCredit: getAllCredits, isLoading, error };
};

export const useGetCreditForShow = (showId: number) => {
    const [credits, setCredits] = useState<ShowCredits>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getCreditForShow = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedCredits = await apiService.getCreditForShow(showId);
            setCredits(fetchedCredits);
            return fetchedCredits;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setCredits, setIsLoading, setError]);

    useEffect(() => {
        getCreditForShow();
    }, [getCreditForShow]);

    return { credits, refreshCredits: getCreditForShow, isLoading, error };
};

export const useAddShowToCredit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addShowToCredit = useCallback(
        async (id: string, showId: number) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToCredit({
                    id,
                    showId,
                });
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addShowToCredit, isLoading, error };
};

export const useUpdateCredit = () => {
    const { setCreditDetails, setIsLoading, setError, isLoading, error, creditDetails } =
        useCreditStore();

    const updateCredit = useCallback(
        async (data: Credit) => {
            if (!data) return;
            setIsLoading(true);
            setError(null);

            try {
                const updatedCredit = await apiService.updateCredit(data);
                setCreditDetails(updatedCredit);
                return updatedCredit;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setCreditDetails, setIsLoading, setError]
    );

    return { updateCredit, isLoading, error, creditDetails };
};
