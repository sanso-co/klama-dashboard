import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { useSearch } from "@/hooks/api/search/useSearch";

import { TextInput } from "@/components/global/TextInput";
import Search from "@/components/pages/collection/Search";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { Button } from "@/components/global/Button";

import { LeanShowType } from "@/types/show";

import styles from "./createlist.module.scss";

interface Props {
    onSubmit: (data: any) => void;
}

export const CreateList = ({ onSubmit }: Props) => {
    const [added, setAdded] = useState<LeanShowType[]>([]);
    const { register, handleSubmit, reset } = useForm();
    const { setQuery, suggestions, setSuggestions } = useSearch();

    const onShowClick = (show: LeanShowType) => {
        const newAdded = [...added, show];
        setAdded(newAdded);
        setSuggestions([]);
    };

    const handleListSubmit = (data: FieldValues) => {
        const list = {
            ...data,
            shows: added.map((item) => {
                return item._id;
            }),
        };
        onSubmit(list);
        reset();
    };

    return (
        <div>
            <div>
                <TextInput
                    label="Add Release Date"
                    name="releaseDate"
                    register={register}
                    type="date"
                />
            </div>
            {added?.length > 0 && (
                <div className={styles.added}>
                    {added.map((show) => (
                        <DramaCard key={show.id} show={show} />
                    ))}
                </div>
            )}
            <div className={styles.search}>
                <Search
                    onSearch={(search) => {
                        setQuery(search);
                    }}
                />
                {suggestions.length > 0 && (
                    <div className={styles.suggestions}>
                        {suggestions.map((show) => (
                            <div
                                key={show.id}
                                onClick={() => onShowClick(show)}
                                className={styles.cardContainer}
                            >
                                <DramaCard show={show} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Button variant="primary" onClick={handleSubmit(handleListSubmit)}>
                Submit
            </Button>
        </div>
    );
};
