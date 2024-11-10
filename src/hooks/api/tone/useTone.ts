import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { ToneType } from "@/interfaces/tone";

export const useCreateTone = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createTone = useCallback(
        async (tone: Partial<ToneType>) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.createTone(tone);
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

    return { createTone, isLoading, error };
};

export const useGetAllTone = () => {
    const [tone, setTone] = useState<ToneType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getAllTone = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedTone = await apiService.getAllTone();
            setTone(fetchedTone);
            return fetchedTone;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setTone, setIsLoading, setError]);

    useEffect(() => {
        getAllTone();
    }, [getAllTone]);

    return { tone, refreshTone: getAllTone, isLoading, error };
};
