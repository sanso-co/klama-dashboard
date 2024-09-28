import { Helmet } from "react-helmet";
import { FieldValues, useForm } from "react-hook-form";
import _ from "lodash";

import { useCreateCredit } from "@/hooks/api/credit/useCredit";

import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import styles from "./credit.module.scss";
import { RadioInput } from "@/components/global/RadioInput";
import { CreditList } from "@/features/Credit/CreditList";

const Credit = () => {
    const { register, handleSubmit, reset } = useForm();

    const { createCredit, isLoading } = useCreateCredit();

    const onSubmit = (data: FieldValues) => {
        createCredit({
            id: parseInt(data.id),
            name: data.name,
            original_name: data.original_name,
            job: data.job,
        });

        reset();
    };

    return (
        <div className={styles.container}>
            <Helmet>
                <title>Credit</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput label="Id" name="id" register={register} />
                <TextInput label="Name" name="name" register={register} />
                <TextInput label="Original Name" name="original_name" register={register} />
                <RadioInput
                    label="Job"
                    name="job"
                    options={["Director", "Screenwriter", "Producer"]}
                    register={register}
                />
                <Button label="Create" disabled={isLoading} />
            </form>
            <CreditList />
        </div>
    );
};

export default Credit;
