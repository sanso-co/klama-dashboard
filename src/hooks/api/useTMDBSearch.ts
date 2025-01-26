import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/tmdbApi";
import { TMDBSearchResults } from "@/types/tmdb";

export const useTMDBSearch = () => {
    const [searchResults, setSearchResults] = useState<TMDBSearchResults>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const clearSearchTerm = useCallback(() => {
        setSearchTerm("");
        setSearchResults({
            page: 1,
            total_pages: 0,
            total_results: 0,
            results: [],
        });
    }, []);

    const search = useCallback(
        async (term: string) => {
            setSearchTerm(term);
            if (!term.trim()) {
                setSearchResults({ page: 1, total_pages: 1, total_results: 0, results: [] });
            }
            setIsLoading(true);
            setError(null);
            try {
                const results = await apiService.searchShows(term);
                setSearchResults(results);
            } catch (error) {
                setError(error instanceof Error ? error : new Error("An error occurred"));
            } finally {
                setIsLoading(false);
            }
        },
        [setSearchResults, setIsLoading, setError]
    );

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm) {
                search(searchTerm);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [search, searchTerm]);

    return {
        search,
        searchResults,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        clearSearchTerm,
    };
};
