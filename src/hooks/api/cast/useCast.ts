import { useCallback, useEffect, useState } from "react";

import { apiService } from "@/services/api";
import { Cast } from "@/interfaces/cast";

export const useGetCastForShow = (showId: number) => {
    const [cast, setCast] = useState<Cast[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const getCastForShow = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedCasts = await apiService.getCastForShow(showId);
            setCast(fetchedCasts);
            return fetchedCasts;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setCast, setIsLoading, setError]);

    useEffect(() => {
        getCastForShow();
    }, [getCastForShow]);

    return { cast, refreshCasts: getCastForShow, isLoading, error };
};

export const useAddCast = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addCastForShow = useCallback(
        async (showId: number, mainCast: Cast[]) => {
            if (!showId) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addCastForShow({
                    showId,
                    mainCast,
                });
                setData(updatedCollection);
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

    return { addCastForShow, isLoading, error, data };
};

export const useAddAdditionalCasts = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addAddtionalCasts = useCallback(
        async (showId: number, additionalCasts: Cast[]) => {
            if (!showId) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.updateAdditionalCasts({
                    showId,
                    additionalCasts,
                });
                setData(updatedCollection);
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

    return { addAddtionalCasts, isLoading, error, data };
};
