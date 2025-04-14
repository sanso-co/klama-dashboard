import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

import { useAddShowToCredit, useGetCreditForShow } from "@/hooks/api/credit/useCredit";

import { Chip } from "@/components/global/Chip";

import { CreditType } from "@/types/credit";

import styles from "./credit.module.scss";
import { SearchInput } from "@/components/global/SearchInput";

interface Props {
    showId: number;
}

export const Credits = ({ showId }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<CreditType[]>([]);
    const [selectedCredits, setSelectedCredits] = useState<CreditType[]>([]);

    const { credits } = useGetCreditForShow(showId);

    useEffect(() => {
        if (credits?.results) {
            setSelectedCredits(credits.results);
        }
    }, [credits]);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/credit/search?query=${searchQuery}`
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

    const { addShowToCredit } = useAddShowToCredit();

    const handleCreditClick = async (credit: CreditType) => {
        if (!selectedCredits.some((g) => g.id === credit.id)) {
            setSelectedCredits((prevCredit) => [...prevCredit, credit]);
        }

        try {
            await addShowToCredit(credit._id, showId);

            setSuggestions([]);
            setQuery("");
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreditRemove = (creditId: number) => {
        setSelectedCredits((prevGenres) => prevGenres.filter((g) => g.id !== creditId));
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Credit</h2>
            </div>
            <SearchInput
                name="search"
                value={query}
                onChange={setQuery}
                placeholder="Search credits"
                variant="sm"
            />
            {suggestions.length > 0 && (
                <ul className={styles.suggestedList}>
                    {suggestions.map((credit) => (
                        <li key={credit._id} onClick={() => handleCreditClick(credit)}>
                            <p>
                                {credit.id} {credit.original_name} ({credit.job})
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            {selectedCredits?.length > 0 && (
                <div className={styles.genre}>
                    {selectedCredits.map((credit) => (
                        <Chip
                            key={credit._id}
                            label={`${credit.original_name} (${credit.job})`}
                            onRemove={() => handleCreditRemove(credit.id)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
