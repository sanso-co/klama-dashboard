import { useCallback, useEffect, useState } from "react";
import { CollectionListType, PeriodicType } from "@/interfaces/periodic";
import { usePeriodicStore } from "@/store/periodicStore";
import { apiService } from "@/services/api";

// Parent
export const useCreatePeriodic = () => {
    const { addPeriodicCollection, setIsLoading, setError, isLoading, error } = usePeriodicStore();

    const createPeriodic = useCallback(
        async (data: Partial<PeriodicType>) => {
            setIsLoading(true);
            setError(null);
            try {
                const newCollection = await apiService.createPeriodicCollection(data);
                addPeriodicCollection(newCollection);
                return newCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [addPeriodicCollection, setIsLoading, setError]
    );

    return { createPeriodic, isLoading, error };
};

export const useGetAllPeriodic = () => {
    const { setPeriodicCollections, setIsLoading, setError, isLoading, error, collections } =
        usePeriodicStore();

    const getAllPeriodic = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedCollections = await apiService.getAllPeriodicCollections();
            setPeriodicCollections(fetchedCollections);
            return fetchedCollections;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setPeriodicCollections, setIsLoading, setError]);

    useEffect(() => {
        getAllPeriodic();
    }, [getAllPeriodic]);

    return { getAllPeriodic, isLoading, error, collections };
};

// Details

export const useGetPeriodicDetails = (id: string) => {
    const { setPeriodicDetails, setIsLoading, setError, isLoading, error, details } =
        usePeriodicStore();

    const getPeriodicDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getPeriodicCollectionDetails(id);
            setPeriodicDetails(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [id, setPeriodicDetails, setIsLoading, setError]);

    useEffect(() => {
        getPeriodicDetails();
    }, [getPeriodicDetails]);

    return { getPeriodicDetails, isLoading, error, details };
};

export const useAddListToPeriodicCollection = (id: string) => {
    const { setPeriodicDetails, setIsLoading, setError, isLoading, error, details } =
        usePeriodicStore();

    const addListToPeriodic = useCallback(
        async (data: CollectionListType) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addListToPeriodicCollection({
                    id,
                    data,
                });
                setPeriodicDetails(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [id, setPeriodicDetails, setIsLoading, setError]
    );

    return { addListToPeriodic, isLoading, error, details };
};

// Sub

export const useGetPeriodicSubDetails = (collectionId: string, listId: string) => {
    const [list, setList] = useState<CollectionListType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getPeriodicDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getPeriodicSubDetails({ collectionId, listId });
            setList(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [collectionId, listId, setList, setIsLoading, setError]);

    useEffect(() => {
        getPeriodicDetails();
    }, [getPeriodicDetails]);

    return { refetch: getPeriodicDetails, isLoading, error, list };
};

export const useAddShowToPeriodicList = (collectionId: string, listId: string) => {
    const [details, setDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addShowToPeriodicList = useCallback(
        async (showId: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToPeriodicList({
                    collectionId,
                    listId,
                    showId,
                });
                setDetails(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [collectionId, listId]
    );

    return { addShowToPeriodicList, isLoading, error, details };
};
