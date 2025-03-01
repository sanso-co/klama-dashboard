import { FieldValues, useForm } from "react-hook-form";
import _ from "lodash";

import { useCreateGenre } from "@/hooks/api/genre/useGenre";

import { GenreList } from "@/features/Genre/GenreList";
import { Header } from "@/components/global/Header";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import styles from "./genre.module.scss";

const Genre = () => {
    const { register, handleSubmit, reset } = useForm();

    const { createGenre, isLoading } = useCreateGenre();

    const handleCreate = (data: FieldValues) => {
        createGenre({
            id: parseInt(data.id),
            name: data.name,
            original_name: data.original_name,
            rank: 999,
        });

        reset();
    };

    return (
        <div className={styles.container}>
            <Header title="Genre" primaryDescription="View, update or create genres">
                <Button label="Create" variant="secondary" />
            </Header>
            {/* <div className={styles.create}>
                <h2 className={styles.listHeader}>Create New Genre</h2>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <div className={styles.input}>
                        <TextInput placeholder="Id" name="id" register={register} />
                        <TextInput placeholder="Name" name="name" register={register} />
                        <TextInput
                            placeholder="Original Name"
                            name="original_name"
                            register={register}
                        />
                    </div>
                    <Button label="Create" variant="primary" disabled={isLoading} />
                </form>
            </div> */}
            <GenreList />
        </div>
    );
};

export default Genre;
