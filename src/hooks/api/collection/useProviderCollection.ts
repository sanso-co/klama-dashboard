import { useCallback, useEffect } from "react";
import { Permanent } from "@/interfaces/permanent";
import { useProviderStore } from "@/store/providerStore";
import { apiService } from "@/services/api";
import { TMDBShow } from "@/interfaces/search";

export const useCreateProvider = () => {
    const { addProviderCollection, setIsLoading, setError, isLoading, error } = useProviderStore();

    const createProvider = useCallback(
        async (data: Permanent) => {
            setIsLoading(true);
            setError(null);
            try {
                const newCollection = await apiService.createProviderCollection(data);
                addProviderCollection(newCollection);
                return newCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [addProviderCollection, setIsLoading, setError]
    );

    return { createProvider, isLoading, error };
};

export const useGetAllProvider = () => {
    const { setProviderCollections, setIsLoading, setError, isLoading, error, collections } =
        useProviderStore();

    const getAllProvider = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedCollections = await apiService.getAllProviderCollections();
            setProviderCollections(fetchedCollections);
            return fetchedCollections;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setProviderCollections, setIsLoading, setError]);

    useEffect(() => {
        getAllProvider();
    }, [getAllProvider]);

    return { getAllProvider, isLoading, error, collections };
};

export const useGetProviderDetails = (id: string) => {
    const { setProviderDetails, setIsLoading, setError, isLoading, error, details } =
        useProviderStore();

    const getProviderDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getProviderCollectionDetails({
                id,
                page: 1,
                limit: 40,
            });
            setProviderDetails(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [id, setProviderDetails, setIsLoading, setError]);

    useEffect(() => {
        getProviderDetails();
    }, [getProviderDetails]);

    return { refetch: getProviderDetails, isLoading, error, details };
};

export const useAddShowToProviderCollection = (id: string) => {
    const { setProviderDetails, setIsLoading, setError, isLoading, error, details } =
        useProviderStore();

    const addShowToProvider = useCallback(
        async (show: TMDBShow) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToProviderCollection({
                    id,
                    show,
                });
                setProviderDetails(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [id, setProviderDetails, setIsLoading, setError]
    );

    return { addShowToProvider, isLoading, error, details };
};

export const useRemoveShowFromProviderCollection = (id: string) => {
    const { setProviderDetails, setIsLoading, setError, isLoading, error, details } =
        useProviderStore();

    const removeShowFromProvider = useCallback(
        async (showId: string) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.removeShowFromProviderCollection({
                    id,
                    showId,
                });
                setProviderDetails(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [id, setProviderDetails, setIsLoading, setError]
    );

    return { removeShowFromProvider, isLoading, error, details };
};
