import { useCallback, useEffect, useState } from "react";
import { apiService as tmdbService } from "@/services/tmdbApi";
import { apiService } from "@/services/api";
import { ProviderResponse } from "@/interfaces/tmdb";

export const useProviders = (id: number) => {
    const [providers, setProviders] = useState<ProviderResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await tmdbService.getProviders(id);
                setProviders(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { providers, isLoading, error };
};

export const useAddShowToProviderCollection = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addShowToProvider = useCallback(
        async (providerId: number, providerName: string, showId: number) => {
            if (!providerId) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToProviderCollection({
                    providerId,
                    providerName,
                    showId,
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

    return { addShowToProvider, isLoading, error, data };
};
