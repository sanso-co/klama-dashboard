import { apiService } from "@/services/api";
import { useCallback, useEffect, useState } from "react";

import { OriginalWorkType } from "@/types/originalWork";

export const useGetOriginalWorkForShow = (showId: number) => {
    const [original, setOriginal] = useState<OriginalWorkType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getOriginalWorkForShow = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedWork = await apiService.getOriginalWorkForShow(showId);
            setOriginal(fetchedWork);
            return fetchedWork;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setOriginal, setIsLoading, setError]);

    useEffect(() => {
        getOriginalWorkForShow();
    }, [getOriginalWorkForShow]);

    return { original, refreshOriginalWork: getOriginalWorkForShow, isLoading, error };
};

export const useCreatOriginal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createOriginalWork = useCallback(
        async (work: OriginalWorkType) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.createOriginalWork(work);
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

    return { createOriginalWork, isLoading, error };
};

export const useCreateOriginalWorkAndLink = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createOriginalWorkAndLink = useCallback(
        async (originalWorkData: OriginalWorkType, showId: number) => {
            setIsLoading(true);
            setError(null);
            try {
                // Create original work
                const originalWork = await apiService.createOriginalWork(originalWorkData);

                try {
                    // Link to show
                    const linkedWork = await apiService.addShowToOriginalWork(
                        originalWork._id,
                        showId
                    );
                    return linkedWork;
                } catch (linkError) {
                    throw linkError;
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { createOriginalWorkAndLink, isLoading, error };
};
