import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { LeanShowType } from "@/interfaces/show";

export const useGetSimilarRecommendations = (showId: number) => {
    const [similar, setSimilar] = useState<LeanShowType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getSimilarShows = useCallback(async () => {
        if (!showId) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getSimilarRecommendations(showId);
            setSimilar(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [showId, setSimilar, setIsLoading, setError]);

    useEffect(() => {
        getSimilarShows();
    }, [getSimilarShows]);

    return { refetch: getSimilarShows, isLoading, error, similar };
};
