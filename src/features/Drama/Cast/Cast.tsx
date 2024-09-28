import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

import styles from "./cast.module.scss";
import { Chip } from "@/components/global/Chip";
import { Credit } from "@/interfaces/credit";
import { useAddShowToCredit } from "@/hooks/api/credit/useCredit";
import { useGetCastForShow } from "@/hooks/api/cast/useCast";
import { CastType } from "@/interfaces/cast";
import { Avatar } from "@/components/global/Avatar";
import { getProfileImage } from "@/services/image-url";

interface Props {
    showId: number;
}

export const Cast = ({ showId }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Credit[]>([]);
    const { cast, refreshCasts } = useGetCastForShow(showId);
    const [selectedCasts, setSelectedCasts] = useState<CastType[]>([]);

    useEffect(() => {
        if (cast) {
            setSelectedCasts(cast);
        }
    }, [cast]);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get(
                    `http://localhost:3500/credit/search?query=${searchQuery}`
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

    const handleCreditClick = async (credit: Credit) => {
        // if (!selectedCredits.some((g) => g.id === credit.id)) {
        //     setSelectedCredits((prevCredit) => [...prevCredit, credit]);
        // }
        // try {
        //     await addShowToCredit(credit._id, showId);
        //     setSuggestions([]);
        //     setQuery("");
        //     alert("succesfully saved");
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Casts</h2>
            </div>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search person"
                className={styles.input}
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((credit) => (
                        <li key={credit.id} onClick={() => handleCreditClick(credit)}>
                            <h3>
                                {credit.id} {credit.name} ({credit.original_name})
                            </h3>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.genre}>
                {selectedCasts.map((cast) => (
                    <Avatar url={getProfileImage(cast.profile_path)} />
                ))}
            </div>
        </section>
    );
};
