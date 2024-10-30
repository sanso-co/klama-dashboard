import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

import { useGetProvidersForShow, useAddShowToProvider } from "@/hooks/api/provider/useProvider";

import { ProviderType } from "@/interfaces/provider";

import styles from "./provider.module.scss";

interface Props {
    showId: number;
}

export const Provider = ({ showId }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ProviderType[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<ProviderType[]>([]);

    const { providers } = useGetProvidersForShow(showId);

    useEffect(() => {
        if (providers) {
            setSelectedProviders(providers);
        }
    }, [providers]);

    const debouncedSearch = debounce(async (searchQuery) => {
        if (searchQuery.length > 0) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/provider/search?query=${searchQuery}`
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

    const { addShowToProvider } = useAddShowToProvider();

    const handleProviderClick = async (provider: ProviderType) => {
        if (!selectedProviders.some((p) => p.id === provider.id)) {
            setSelectedProviders((prevProviders) => [...prevProviders, provider]);
        }

        try {
            await addShowToProvider(provider.id, showId);

            setSuggestions([]);
            setQuery("");
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Providers</h2>
            </div>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search providers"
                className={styles.input}
            />
            {suggestions.length > 0 && (
                <ul className={styles.suggestedList}>
                    {suggestions.map((provider) => (
                        <li key={provider.id} onClick={() => handleProviderClick(provider)}>
                            <p>
                                {provider.id} {provider.name}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.genre}>
                {selectedProviders.map((provider) => (
                    <div key={provider.id} className={styles.logo}>
                        <div className={styles.logoContainer}>
                            <img src={provider.logo_path} alt="" />
                        </div>
                        <span>{provider.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
