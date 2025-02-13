import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

import { useUpdateShow } from "@/hooks/api/drama/useShow";

import { Button } from "@/components/global/Button";
import { Chip } from "@/components/global/Chip";

import { GenreType } from "@/types/genre";

import styles from "./genres.module.scss";

interface Props {
    id: number;
    genres: GenreType[];
}

export const Genres = ({ id, genres }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<GenreType[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<GenreType[]>(genres || []);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get(
                    `http://localhost:4500/api/genre/search?query=${searchQuery}`
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

    const handleGenreClick = (genre: GenreType) => {
        if (!selectedGenres.some((g) => g.id === genre.id)) {
            setSelectedGenres((prevGenres) => [...prevGenres, genre]);
        }

        setSuggestions([]);
        setQuery("");
    };

    const handleGenreRemove = (genreId: number) => {
        setSelectedGenres((prevGenres) => prevGenres.filter((g) => g.id !== genreId));
    };

    const { updateShow } = useUpdateShow(id);

    const handleSave = async () => {
        try {
            await updateShow({ genres: selectedGenres });
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Genres</h2>
            </div>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search genres"
                className={styles.input}
            />
            {suggestions.length > 0 && (
                <ul className={styles.suggestedList}>
                    {suggestions.map((genre) => (
                        <li key={genre.id} onClick={() => handleGenreClick(genre)}>
                            <p>
                                {genre.id} {genre.name} ({genre.original_name})
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.genre}>
                {selectedGenres.map((genre) => (
                    <Chip
                        key={genre.id}
                        label={`${genre.name} ${genre.original_name}`}
                        onRemove={() => handleGenreRemove(genre.id)}
                    />
                ))}
            </div>
            <Button label="Save Genres" variant="primary" onClick={handleSave} />
        </section>
    );
};
