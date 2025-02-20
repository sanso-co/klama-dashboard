import { FormProvider, useForm } from "react-hook-form";
import { debounce } from "lodash";
import axios from "axios";

import { useUpdateShow } from "@/hooks/api/drama/useShow";

import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";

import { ShowType } from "@/types/show";

import styles from "./original.module.scss";
import { useEffect, useState } from "react";
import { CreditType } from "@/types/credit";
import { useGetCreditForShow } from "@/hooks/api/credit/useCredit";
import { Chip } from "@/components/global/Chip";

interface Props {
    id: number;
    show: ShowType;
}

export const Original = ({ id, show }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<CreditType[]>([]);
    const [selectedCredits, setSelectedCredits] = useState<CreditType[]>([]);

    const { credits } = useGetCreditForShow(id);

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

    const handleCreditClick = async (credit: CreditType) => {
        if (!selectedCredits.some((g) => g.id === credit.id)) {
            setSelectedCredits((prevCredit) => [...prevCredit, credit]);
        }

        setSuggestions([]);
        setQuery("");
    };

    const handleCreditRemove = (creditId: number) => {
        setSelectedCredits((prevCredit) => prevCredit.filter((c) => c.id !== creditId));
    };

    const defaultValues = {
        original_story: {
            title: {
                title: show.original_story?.title?.title || "",
                korean_title: show.original_story?.title?.korean_title || "",
            },
            author: {
                name: show.original_story?.author?.name || "",
                korean_name: show.original_story?.author?.korean_name || "",
            },
        },
    };

    const methods = useForm({ defaultValues });

    const { updateShow } = useUpdateShow(id);

    const onSubmit = async (data: any) => {
        try {
            await updateShow(data);
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Original Story</h2>
            </div>
            {/* <div className={styles.display}>
                <div>
                    <p className={styles.subtitle}>Title</p>
                    <p>Lightshop (조명가게)</p>
                </div>
                <div className={styles.author}>
                    <p className={styles.subtitle}>Author</p>
                    <p>by Kang Full (강풀)</p>
                </div>
            </div> */}
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div>
                        <input
                            id="search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for an author"
                            className={styles.input}
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
                        <div className={styles.genre}>
                            {selectedCredits.map((credit) => (
                                <Chip
                                    key={credit.id}
                                    label={`${credit.name} ${credit.original_name}`}
                                    onRemove={() => handleCreditRemove(credit.id)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.flex}>
                        <Input name="original_story.title.title" label="Title" />
                        <Input name="original_story.title.korean_title" label="Korean Title" />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button type="submit" label="Save" variant="primary" />
                    </div>
                </form>
            </FormProvider>
        </section>
    );
};
