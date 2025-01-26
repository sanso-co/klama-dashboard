import { useCallback, useEffect } from "react";
import { PermanentType } from "@/types/permanent";
import { usePermanentStore } from "@/store/permanentStore";
import { apiService } from "@/services/api";

export const useCreatePermanent = () => {
    const { addPermanentCollection, setIsLoading, setError, isLoading, error } =
        usePermanentStore();

    const createPermanent = useCallback(
        async (data: Partial<PermanentType>) => {
            setIsLoading(true);
            setError(null);
            try {
                const newCollection = await apiService.createPermanentCollection(data);
                addPermanentCollection(newCollection);
                return newCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [addPermanentCollection, setIsLoading, setError]
    );

    return { createPermanent, isLoading, error };
};

export const useGetAllPermanent = () => {
    const { setPermanentCollections, setIsLoading, setError, isLoading, error, collections } =
        usePermanentStore();

    const getAllPermanent = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedCollections = await apiService.getAllPermanentCollections();
            setPermanentCollections(fetchedCollections);
            return fetchedCollections;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setPermanentCollections, setIsLoading, setError]);

    useEffect(() => {
        getAllPermanent();
    }, [getAllPermanent]);

    return { getAllPermanent, isLoading, error, collections };
};

export const useGetPermanentDetails = (collectionId: string) => {
    const { setPermanentDetails, setIsLoading, setError, isLoading, error, details } =
        usePermanentStore();

    const getPermanentDetails = useCallback(async () => {
        if (!collectionId) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getPermanentCollectionDetails({
                collectionId,
                page: 1,
                limit: 40,
            });
            setPermanentDetails(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [collectionId, setPermanentDetails, setIsLoading, setError]);

    useEffect(() => {
        getPermanentDetails();
    }, [getPermanentDetails]);

    return { refetch: getPermanentDetails, isLoading, error, details };
};

export const useAddShowToPermanentCollection = (id: string) => {
    const { setPermanentDetails, setIsLoading, setError, isLoading, error, details } =
        usePermanentStore();

    const addShowToPermanent = useCallback(
        async (showObjId: string) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToPermanentCollection({
                    id,
                    showObjId,
                });
                setPermanentDetails(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [id, setPermanentDetails, setIsLoading, setError]
    );

    return { addShowToPermanent, isLoading, error, details };
};

export const useRemoveShowFromPermanentCollection = (id: number) => {
    const { setPermanentDetails, setIsLoading, setError, isLoading, error, details } =
        usePermanentStore();

    const removeShowFromPermanent = useCallback(
        async (showId: number) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.removeShowFromPermanentCollection({
                    id,
                    showId,
                });
                setPermanentDetails(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [id, setPermanentDetails, setIsLoading, setError]
    );

    return { removeShowFromPermanent, isLoading, error, details };
};
