import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { GenreType } from "@/interfaces/genre";

export const useCreateGenre = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createGenre = useCallback(
        async (genre: Partial<GenreType>) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.createGenre(genre);
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

    return { createGenre, isLoading, error };
};

export const useGetAllGenre = () => {
    const [genre, setGenre] = useState<GenreType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getAllGenre = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedGenre = await apiService.getAllGenre();
            setGenre(fetchedGenre);
            return fetchedGenre;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setGenre, setIsLoading, setError]);

    useEffect(() => {
        getAllGenre();
    }, [getAllGenre]);

    return { genre, refreshGenre: getAllGenre, isLoading, error };
};

export const useUpdateGenre = () => {
    const [genreDetails, setGenreDetails] = useState<GenreType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateGenre = useCallback(
        async (data: GenreType) => {
            if (!data) return;
            setIsLoading(true);
            setError(null);

            try {
                const updatedKeyword = await apiService.updateGenre(data);
                setGenreDetails(updatedKeyword);
                return updatedKeyword;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setGenreDetails, setIsLoading, setError]
    );

    return { updateGenre, isLoading, error, genreDetails };
};
