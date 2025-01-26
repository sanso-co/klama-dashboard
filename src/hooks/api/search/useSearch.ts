import { useState, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";

import { LeanShowType } from "@/types/show";

export const useSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<LeanShowType[]>([]);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 1) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/show/search?query=${searchQuery}`
                );
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    }, 300);

    useEffect(() => {
        debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query]);

    return { query, setQuery, suggestions, setSuggestions };
};
