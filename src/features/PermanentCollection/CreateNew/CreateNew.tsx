import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

import { useCreatePermanent } from "@/hooks/api/collection/usePermanentCollection";

import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import styles from "./createnew.module.scss";

interface Props {
    onSuccess: (id: string) => void;
}

export const CreateNew = ({ onSuccess }: Props) => {
    const { createPermanent, isLoading, error } = useCreatePermanent();
    const { register, handleSubmit } = useForm();

    const handleCreate = async (data: FieldValues) => {
        try {
            const response = await createPermanent({
                name: data.name,
                description: data.description,
            });
            onSuccess(response._id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
            <TextInput label="Name" name="name" register={register} />
            <TextInput label="Description" name="description" register={register} />
            {error && <p>{error.message}</p>}
            <Button label="Create" variant="primary" disabled={isLoading} />
        </form>
    );
};
