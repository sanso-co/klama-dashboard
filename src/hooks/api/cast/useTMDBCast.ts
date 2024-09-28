import { useEffect, useState } from "react";

import { apiService } from "@/services/tmdbApi";
import { CastType } from "@/interfaces/tmdb";

export const useTMDBCast = (id: number) => {
    const [cast, setCast] = useState<CastType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCast(id);
                setCast(result.cast);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { cast, isLoading, error };
};
