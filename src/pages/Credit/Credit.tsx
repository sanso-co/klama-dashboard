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
                        <div className={styles.radio}>
                            <RadioInput
                                name="job"
                                options={["Director", "Screenwriter", "Producer", "Original Story"]}
                                register={register}
                            />
                        </div>
                    </div>
                    <Button label="Create" variant="primary" disabled={isLoading} />
                </form>
            </div>
            <CreditList />
        </div>
    );
};

export default Credit;
