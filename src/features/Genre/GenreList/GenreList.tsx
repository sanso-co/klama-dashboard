import { useState } from "react";
import { useForm } from "react-hook-form";

import { useGetAllGenre, useUpdateGenre } from "@/hooks/api/genre/useGenre";
import { InputTable } from "@/components/global/InputTable";

import { GenreType } from "@/types/genre";

import styles from "./genrelist.module.scss";

const columns = [
    {
        key: "id",
        label: "Id",
        width: 1,
    },
    {
        key: "name",
        label: "Name",
        width: 3,
    },
    {
        key: "rank",
        label: "Rank",
        type: "input",
        width: 2,
    },
    {
        key: "action",
        label: "Action",
        type: "button",
        width: 2,
    },
];

export const GenreList = () => {
    const { genre, refreshGenre } = useGetAllGenre();
    const { updateGenre } = useUpdateGenre();
    const { register, handleSubmit, getValues } = useForm();

    const onUpdateSubmit = async (genre: GenreType) => {
        const inputValue = getValues(genre.id.toString());

        const updatedData: GenreType = {
            ...genre,
            rank: inputValue,
        };

        try {
            await updateGenre(updatedData);
            await refreshGenre();
        } catch (error) {
            console.error(error);
        }

        // return async () => {
        //     const inputValue = getValues(genre.id.toString());
        //     try {
        //         const updatedData: GenreType = {
        //             ...genre,
        //             rank: inputValue,
        //         };
        //         console.log("c", updatedData);

        //         // await updateGenre(updatedData);
        //         // await refreshGenre();
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
    };

    if (!genre) return null;

    return (
        <div className={styles.container}>
            <InputTable<GenreType>
                columns={columns}
                data={genre}
                register={register}
                handleClick={onUpdateSubmit}
            />
        </div>
    );
};
