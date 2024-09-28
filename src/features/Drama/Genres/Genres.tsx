import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

import { useUpdateShow } from "@/hooks/api/drama/useShow";

import { Genre } from "@/interfaces/genre";
import { Button } from "@/components/global/Button";

import styles from "./genres.module.scss";
import { Chip } from "@/components/global/Chip";

interface Props {
    id: number;
    genres: Genre[];
}

export const Genres = ({ id, genres }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>(genres || []);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get(
                    `http://localhost:3500/genre/search?query=${searchQuery}`
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

    const handleGenreClick = (genre: Genre) => {
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
                <ul>
                    {suggestions.map((genre) => (
                        <li key={genre.id} onClick={() => handleGenreClick(genre)}>
                            <h3>
                                {genre.id} {genre.name} ({genre.original_name})
                            </h3>
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
