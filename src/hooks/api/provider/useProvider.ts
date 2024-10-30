import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { ProviderType } from "@/interfaces/provider";

export const useAddProvider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addProvider = useCallback(
        async (provider: Partial<ProviderType>) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.addProvider(provider);
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

    return { addProvider, isLoading, error };
};

export const useGetAllProviders = () => {
    const [providers, setProviders] = useState<ProviderType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getProviders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProviders = await apiService.getAllProviders();
            setProviders(fetchedProviders);
            return fetchedProviders;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setProviders, setIsLoading, setError]);

    useEffect(() => {
        getProviders();
    }, [getProviders]);

    return { providers, refreshProviders: getProviders, isLoading, error };
};

export const useUpdateProvider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateProvider = useCallback(
        async (data: ProviderType) => {
            if (!data) return;
            setIsLoading(true);
            setError(null);

            try {
                const updatedKeyword = await apiService.updateProvider(data);
                return updatedKeyword;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { updateProvider, isLoading, error };
};

export const useGetProvidersForShow = (showId: number) => {
    const [providers, setProviders] = useState<ProviderType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getProvidersForShow = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProviders = await apiService.getProvidersForShow(showId);
            setProviders(fetchedProviders.results);
            return fetchedProviders.results;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setProviders, setIsLoading, setError]);

    useEffect(() => {
        getProvidersForShow();
    }, [getProvidersForShow]);

    return { providers, refreshProviders: getProvidersForShow, isLoading, error };
};

export const useAddShowToProvider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addShowToProvider = useCallback(
        async (id: number, showId: number) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToProvider({
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

    return { addShowToProvider, isLoading, error };
};
