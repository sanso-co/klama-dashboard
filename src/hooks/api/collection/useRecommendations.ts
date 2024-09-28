import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { RecommendationsResponse, RecommendationsShow } from "@/interfaces/recommendations";
import { useRecommendationsStore } from "@/store/recommendationsStore";
import { TMDBShow } from "@/interfaces/search";

export const useCreateShow = () => {
    const [show, setShow] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const createShow = useCallback(
        async (data: RecommendationsShow) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.createShowForRecommendations(data);
                setShow(response);
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

    return { createShow, show, isLoading, error };
};

export const useGetAllShows = () => {
    const [shows, setShows] = useState<RecommendationsResponse[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const getAllShows = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedShows = await apiService.getAllShowsForRecommendations();
            setShows(fetchedShows);
            return fetchedShows;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setError]);

    useEffect(() => {
        getAllShows();
    }, [getAllShows]);

    return { getAllShows, isLoading, error, shows };
};

export const useGetsRecommendationsDetails = (id: string) => {
    const { setRecommendationDetails, setIsLoading, setError, isLoading, error, details } =
        useRecommendationsStore();

    const getPermanentDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getRecommendationDetails({
                id,
                page: 1,
            });
            setRecommendationDetails(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [id, setRecommendationDetails, setIsLoading, setError]);

    useEffect(() => {
        getPermanentDetails();
    }, [getPermanentDetails]);

    return { refetch: getPermanentDetails, isLoading, error, details };
};

export const useAddShowToRecommendations = (id: string) => {
    const [show, setShow] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addShowToRecommendations = useCallback(
        async (recommended: TMDBShow) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToRecommendations({
                    id,
                    recommended,
                });
                setShow(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [id, setIsLoading, setError]
    );

    return { addShowToRecommendations, show, isLoading, error };
};
