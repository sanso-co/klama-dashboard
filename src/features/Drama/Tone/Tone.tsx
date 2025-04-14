import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

import { useUpdateShow } from "@/hooks/api/drama/useShow";

import { SearchInput } from "@/components/global/SearchInput";
import { Chip } from "@/components/global/Chip";
import { Button } from "@/components/global/Button";

import { ToneType } from "@/types/tone";

import styles from "./tone.module.scss";

interface Props {
    showId: number;
    tones: ToneType[];
}

export const Tone = ({ showId, tones }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ToneType[]>([]);
    const [selectedTones, setSelectedTones] = useState<ToneType[]>(tones || []);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/tone/search?query=${searchQuery}`
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

    const handleToneClick = async (tone: ToneType) => {
        if (!selectedTones.some((g) => g.id === tone.id)) {
            setSelectedTones((prevTones) => [...prevTones, tone]);
        }

        setSuggestions([]);
        setQuery("");
    };

    const handleKeywordRemove = (keywordId: number) => {
        setSelectedTones((prevTones) => prevTones.filter((k) => k.id !== keywordId));
    };

    const { updateShow } = useUpdateShow(showId);

    const handleSave = async () => {
        try {
            await updateShow({ tones: selectedTones });
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Tone</h2>
            </div>
            <SearchInput
                name="search"
                value={query}
                onChange={setQuery}
                placeholder="Search tones"
                variant="sm"
            />
            {suggestions.length > 0 && (
                <ul className={styles.suggestedList}>
                    {suggestions.map((keyword) => (
                        <li key={keyword.id} onClick={() => handleToneClick(keyword)}>
                            <p>
                                {keyword.id} {keyword.name} ({keyword.original_name})
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.genre}>
                {selectedTones.map((tone) => (
                    <Chip
                        key={tone.id}
                        label={`${tone.name} ${tone.original_name}`}
                        onRemove={() => handleKeywordRemove(tone.id)}
                    />
                ))}
            </div>
            <Button variant="primary" size="sm" onClick={handleSave}>
                Save Tone
            </Button>
        </section>
    );
};
