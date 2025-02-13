import { useForm } from "react-hook-form";

import { useGetAllGenre, useUpdateGenre } from "@/hooks/api/genre/useGenre";

import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import { GenreType } from "@/types/genre";

import styles from "./genrelist.module.scss";

export const GenreList = () => {
    const { genre, refreshGenre } = useGetAllGenre();
    const { updateGenre } = useUpdateGenre();
    const { register, handleSubmit, getValues } = useForm();

    const onUpdateSubmit = (genre: GenreType) => {
        return async () => {
            const inputValue = getValues(genre.id.toString());
            try {
                const updatedData: GenreType = {
                    ...genre,
                    rank: inputValue,
                };

                await updateGenre(updatedData);
                await refreshGenre();
            } catch (error) {
                console.error(error);
            }
        };
    };

    return (
        <div className={styles.container}>
            {genre &&
                genre.length &&
                genre.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.keyword}>
                            <div className={styles.id}>{item.id}</div>
                            <div className={styles.main}>
                                <div className={styles.names}>
                                    <div
                                        className={styles.name}
                                    >{`${item.name} (${item.original_name})`}</div>
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
