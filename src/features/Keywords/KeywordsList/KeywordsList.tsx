import { useForm } from "react-hook-form";

import { useGetAllKeywords, useUpdateKeyword } from "@/hooks/api/keywords/useKeywords";

import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";
import { Keyword } from "@/interfaces/keyword";

import styles from "./keywordslist.module.scss";

export const KeywordsList = () => {
    const { keywords, refreshKeywords } = useGetAllKeywords();
    const { updateKeyword } = useUpdateKeyword();
    const { register, handleSubmit, getValues } = useForm();

    const onSubmit = (keyword: Keyword) => {
        return async () => {
            const inputValue = getValues(keyword.id.toString());
            try {
                const updatedData: Keyword = {
                    ...keyword,
                    rank: inputValue,
                };

                await updateKeyword(updatedData);
                await refreshKeywords();
            } catch (error) {
                console.error(error);
            }
        };
    };

    return (
        <div className={styles.container}>
            {keywords &&
                keywords.length &&
                keywords.map((keyword) => (
                    <div key={keyword.id} className={styles.item}>
                        <div className={styles.keyword}>
                            <div className={styles.id}>{keyword.id}</div>
                            <div className={styles.main}>
                                <div className={styles.names}>
                                    <div className={styles.name}>{keyword.name}</div>
                                    <div className={styles.name}>{keyword.original_name}</div>
                                </div>

                                <div className={styles.action}>
                                    <TextInput
                                        name={keyword.id.toString()}
                                        register={register}
                                        defaultValue={keyword.rank}
                                    />
                                    <Button
                                        label="Update"
                                        onClick={handleSubmit(onSubmit(keyword))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
