import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";
import { RadioGroup } from "@/components/global/RadioGroup";
import { useState } from "react";
import { useCreatePeriodic } from "@/hooks/api/collection/usePeriodicCollection";

import styles from "./createnew.module.scss";

const frequencyOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Quarterly", value: "quarterly" },
];

interface Props {
    onSuccess: (id: string) => void;
}

export const CreateNew = ({ onSuccess }: Props) => {
    const { createPeriodic, isLoading, error } = useCreatePeriodic();
    const { register, handleSubmit } = useForm();
    const [frequency, setFrequency] = useState<string>("weekly");

    const handleCreate = async (data: FieldValues) => {
        try {
            const response = await createPeriodic({
                name: data.name,
                description: data.description,
                frequency: frequency,
            });
            onSuccess(response._id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFrequencyChange = (newSelectedFrequency: string) => {
        setFrequency(newSelectedFrequency);
    };

    return (
        <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
            <TextInput label="Name" name="name" register={register} />
            <TextInput label="Description" name="description" register={register} />
            <RadioGroup
                options={frequencyOptions}
                onChange={handleFrequencyChange}
                value={frequency}
                name="frequency-select"
            />
            {error && <p>{error.message}</p>}
            <Button label="Create" variant="primary" disabled={isLoading} />
        </form>
    );
};
