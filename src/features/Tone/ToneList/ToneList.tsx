import { useForm } from "react-hook-form";

import { useUpdateKeyword } from "@/hooks/api/keywords/useKeywords";
import { useGetAllTone } from "@/hooks/api/tone/useTone";

import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import { KeywordType } from "@/types/keyword";

import styles from "./tonelist.module.scss";

export const ToneList = () => {
    const { tone, refreshTone } = useGetAllTone();
    const { updateKeyword } = useUpdateKeyword();
    const { register, handleSubmit, getValues } = useForm();

    const onUpdateSubmit = (keyword: KeywordType) => {
        return async () => {
            const inputValue = getValues(keyword.id.toString());
            try {
                const updatedData: KeywordType = {
                    ...keyword,
                    rank: inputValue,
                };

                await updateKeyword(updatedData);
                await refreshTone();
            } catch (error) {
                console.error(error);
            }
        };
    };

    return (
        <div className={styles.container}>
            {tone &&
                tone.length &&
                tone.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.keyword}>
                            <div className={styles.id}>{item.id}</div>
                            <div className={styles.main}>
                                <div className={styles.names}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.name}>{item.original_name}</div>
                                </div>

                                <div className={styles.action}>
                                    <TextInput
                                        name={item.id.toString()}
                                        register={register}
                                        defaultValue={item.rank}
                                    />
                                    <Button
                                        label="Update"
                                        onClick={handleSubmit(onUpdateSubmit(item))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
