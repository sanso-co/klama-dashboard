import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { debounce } from "lodash";
import axios from "axios";

import {
    useCreateOriginalWorkAndLink,
    useGetOriginalWorkForShow,
} from "@/hooks/api/originalWork/useOriginalWork";
import { CreditType } from "@/types/credit";

import { Button } from "@/components/global/Button";
import { Chip } from "@/components/global/Chip";
import { Input } from "@/components/global/Input";
import { RadioInput } from "@/components/global/RadioInput";

import styles from "./original.module.scss";
import common from "@/assets/styles/common.module.scss";

interface Props {
    id: number;
}

export const OriginalWork = ({ id }: Props) => {
    const { original } = useGetOriginalWorkForShow(id);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<CreditType[]>([]);

    const defaultValues = {
        title: "",
        original_title: "",
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

    const { createOriginalWorkAndLink } = useCreateOriginalWorkAndLink();

    const onSubmit = async (data: any) => {
        const originalWork = {
            title: data.title,
            original_title: data.original_title,
            authorId: data.author._id,
            type: data.type,
        };

        try {
            await createOriginalWorkAndLink(originalWork, id);
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={common.sectionTitle}>
                <h2>Original Story</h2>
            </div>
            {original && original.hasOriginalWork && (
                <div className={styles.display}>
                    <p>{`${original.title} (${original.original_title})`}</p>
                    <p>{`by ${original.author.name} (${original.author.original_name})`}</p>
                </div>
            )}
            <div className={styles.authorLabel}>Original Story Author</div>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for original story author"
                className={styles.author}
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
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.title}>
                        <Input name="title" label="Title" variant="sm" />
                        <Input name="original_title" label="Original Title" variant="sm" />
                    </div>
                    <RadioInput
                        groupLabel="Original Work Type"
                        size="sm"
                        name="type"
                        options={["Webtoon", "Novel", "Other"]}
                        defaultValue={defaultValues.type}
                        register={register}
                    />
                    <div className={styles.buttonContainer}>
                        <Button variant="primary" size="sm">
                            Save Original Work
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </section>
    );
};
