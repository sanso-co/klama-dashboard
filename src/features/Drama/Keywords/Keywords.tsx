import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

import { useAddShowToKeyword, useGetKeywordsForShow } from "@/hooks/api/keywords/useKeywords";

import { KeywordResponse } from "@/interfaces/keyword";
import { Chip } from "@/components/global/Chip";

import styles from "./keywords.module.scss";

interface Props {
    showId: number;
}

export const Keywords = ({ showId }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<KeywordResponse[]>([]);
    const { keywords } = useGetKeywordsForShow(showId);
    const [selectedKeywords, setSelectedKeywords] = useState<KeywordResponse[]>([]);

    useEffect(() => {
        if (keywords?.results) {
            setSelectedKeywords(keywords.results);
        }
    }, [keywords]);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/keyword/search?query=${searchQuery}`
                );
                setSuggestions(response.data);
                console.log(response.data);
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

    const { addShowToKeyword } = useAddShowToKeyword();

    const handleKeywordClick = async (keyword: KeywordResponse) => {
        if (!selectedKeywords.some((g) => g.id === keyword.id)) {
            setSelectedKeywords((prevKeywords) => [...prevKeywords, keyword]);
        }

        try {
            await addShowToKeyword(keyword._id, showId);

            setSuggestions([]);
            setQuery("");
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeywordRemove = (keywordId: number) => {
        setSelectedKeywords((prevKeywords) => prevKeywords.filter((k) => k.id !== keywordId));
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Keywords</h2>
            </div>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keywords"
                className={styles.input}
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((keyword) => (
                        <li key={keyword.id} onClick={() => handleKeywordClick(keyword)}>
                            <h3>
                                {keyword.id} {keyword.name} ({keyword.original_name})
                            </h3>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.genre}>
                {selectedKeywords.map((keyword) => (
                    <Chip
                        key={keyword.id}
                        label={`${keyword.name} ${keyword.original_name}`}
                        onRemove={() => handleKeywordRemove(keyword.id)}
                    />
                ))}
            </div>
        </section>
    );
};
