import { useEffect, useState } from "react";
import { apiService as tmdbService } from "@/services/tmdbApi";
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
