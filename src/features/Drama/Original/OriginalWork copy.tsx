import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { debounce } from "lodash";
import axios from "axios";

import { useUpdateShow } from "@/hooks/api/drama/useShow";

import { Button } from "@/components/global/Button";
import { Chip } from "@/components/global/Chip";

import { CreditType } from "@/types/credit";

import styles from "./original.module.scss";
import { Input } from "@/components/global/Input";
import { RadioInput } from "@/components/global/RadioInput";

interface Props {
    id: number;
}

export const OriginalWork = ({ id }: Props) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<CreditType[]>([]);

    const defaultValues = {
        title: "",
        korean_title: "",
        author: null as CreditType | null,
        type: undefined,
    };

    const methods = useForm({ defaultValues });
    const { register, watch, setValue } = methods as unknown as UseFormReturn<FieldValues>;
    const selectedAuthor = watch("author");

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

    const handleCreditClick = (credit: CreditType) => {
        setValue("author", credit);
        setSuggestions([]);
        setQuery("");
    };

    const handleCreditRemove = () => {
        setValue("author", null);
    };

    const { updateShow } = useUpdateShow(id);

    const onSubmit = async (data: any) => {
        // const originalWork = {
        //     title: data.title,
        //     original_title: data.original_title,
        //     author: data.author._id,
        //     type: data.type,
        // };
        try {
            console.log(data);
        } catch (error) {}
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Original Story</h2>
            </div>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for original story author"
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
            <div className={styles.credit}>
                {selectedAuthor && (
                    <Chip
                        label={`${selectedAuthor.original_name} (${selectedAuthor.job})`}
                        onRemove={handleCreditRemove}
                    />
                )}
            </div>
            <FormProvider {...methods}>
                <div className={styles.flex}>
                    <Input name="original_story.title.title" label="Title" />
                    <Input name="original_story.title.korean_title" label="Korean Title" />
                </div>
                <RadioInput
                    label="Original Work Type"
                    name="is_custom_content"
                    options={["Webtoon", "Novel", "Other"]}
                    defaultValue={defaultValues.type}
                    register={register}
                />
                <div className={styles.buttonContainer}>
                    <Button label="Save Original Work" variant="primary" onClick={onSubmit} />
                </div>
            </FormProvider>
        </section>
    );
};
