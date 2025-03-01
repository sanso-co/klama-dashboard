import { FieldValues, useForm } from "react-hook-form";
import _ from "lodash";

import { useCreateTone } from "@/hooks/api/tone/useTone";

import { Header } from "@/components/global/Header";
import { ToneList } from "@/features/Tone/ToneList";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import styles from "./tone.module.scss";

const Tone = () => {
    const { register, handleSubmit, reset } = useForm();

    const { createTone, isLoading } = useCreateTone();

    const handleCreate = (data: FieldValues) => {
        createTone({
            id: parseInt(data.id),
            name: data.name,
            original_name: data.original_name,
            rank: 999,
        });

        reset();
    };

    return (
        <div className={styles.container}>
            <Header title="Tone" primaryDescription="Tone that describes the mood of the show" />
            <div className={styles.create}>
                <h2 className={styles.listHeader}>Create New</h2>
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
            </div>
            <ToneList />
        </div>
    );
};

export default Tone;
