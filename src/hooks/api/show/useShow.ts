import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { ShowResponseType } from "@/interfaces/show";

export const useGetAllShow = (page: number, sort: string) => {
    const [shows, setShows] = useState<ShowResponseType>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const fetchedShows = await apiService.getShow(page, sort);
                setShows(fetchedShows);
                return fetchedShows;
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShows();
    }, [page, sort]);

    return { shows, isLoading, error };
};
