import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { useRecommendationsStore } from "@/store/recommendationsStore";

export const useAddShowToRecommendations = () => {
    const [show, setShow] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addShowToRecommendation = useCallback(
        async (showId: number, recoShowId: number) => {
            if (!showId) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedRecommendation = await apiService.addShowToRecommendation({
                    showId,
                    recoShowId,
                });
                setShow(updatedRecommendation);
                return updatedRecommendation;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addShowToRecommendation, show, isLoading, error };
};

export const useUpdateRecommendations = () => {
    const [show, setShow] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const updateRecommendations = useCallback(
        async (showId: number, shows: string[]) => {
            if (!showId) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedRecommendation = await apiService.updateRecommendations({
                    showId,
                    shows,
                });
                setShow(updatedRecommendation);
                return updatedRecommendation;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { updateRecommendations, show, isLoading, error };
};

export const useGetsRecommendationsDetails = (showId: number) => {
    const { setRecommendationDetails, setIsLoading, setError, isLoading, error, details } =
        useRecommendationsStore();

    const getRecommendationDetails = useCallback(async () => {
        if (!showId) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getRecommendationDetails(showId);
            setRecommendationDetails(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [showId, setRecommendationDetails, setIsLoading, setError]);

    useEffect(() => {
        getRecommendationDetails();
    }, [getRecommendationDetails]);

    return { refetch: getRecommendationDetails, isLoading, error, details };
};
