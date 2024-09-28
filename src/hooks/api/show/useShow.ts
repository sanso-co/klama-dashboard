import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { ShowResponse } from "@/interfaces/show";

export const useGetAllShow = (page: number) => {
    const [shows, setShows] = useState<ShowResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const fetchedShows = await apiService.getShow(page);
                setShows(fetchedShows);
                return fetchedShows;
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShows();
    }, [page]);

    return { shows, isLoading, error };
};
