import { FieldValues, useForm } from "react-hook-form";
import _ from "lodash";

import { useCreateKeyword } from "@/hooks/api/keywords/useKeywords";

import { KeywordsList } from "@/features/Keywords/KeywordsList";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import styles from "./keywords.module.scss";
import { Header } from "@/components/global/Header";

const Keywords = () => {
    const { register, handleSubmit, reset } = useForm();

    const { createKeyword, isLoading } = useCreateKeyword();

    const onSubmit = (data: FieldValues) => {
        createKeyword({
            id: parseInt(data.id),
            name: data.name,
            original_name: data.original_name,
            rank: 999,
        });

        reset();
    };

    return (
        <div className={styles.container}>
            <Header title="Keywords" description="Keywords that describe show" />
            <div className={styles.create}>
                <h2 className={styles.listHeader}>Create New</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
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
            <KeywordsList />
        </div>
    );
};

export default Keywords;
