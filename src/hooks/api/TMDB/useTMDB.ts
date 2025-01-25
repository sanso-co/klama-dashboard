import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdbApi";
import { TMDBShowDetails } from "@/interfaces/tmdb";

export const useGetShowDetails = (id: string) => {
    const [data, setData] = useState<TMDBShowDetails>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await apiService.getShowDetails(id);
                setData(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { data, isLoading, error };
};
