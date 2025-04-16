import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

import { useGetProvidersForShow, useAddShowToProvider } from "@/hooks/api/provider/useProvider";

import { ProviderType } from "@/types/provider";

import { SearchInput } from "@/components/global/SearchInput";

import styles from "./provider.module.scss";
import { Chip } from "@/components/global/Chip";

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
            <SearchInput
                name="search"
                value={query}
                onChange={setQuery}
                placeholder="Search providers"
                variant="sm"
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
                    <Chip key={provider.id} label={provider.name} imgSrc={provider.logo_path} />
                ))}
            </div>
        </section>
    );
};
