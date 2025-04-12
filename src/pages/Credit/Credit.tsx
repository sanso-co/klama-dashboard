import { FieldValues, useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import _ from "lodash";

import { useCreateCredit } from "@/hooks/api/credit/useCredit";

import { creditJobOptions } from "@/helpers/constants/options";

import { CreditList } from "@/features/Credit/CreditList";
import { TextInput } from "@/components/global/TextInput";
import { RadioInput } from "@/components/global/RadioInput";
import { Button } from "@/components/global/Button";

import styles from "./credit.module.scss";

const Credit = () => {
    const { register, handleSubmit, reset } = useForm();

    const { createCredit, isLoading } = useCreateCredit();

    const handleCreate = (data: FieldValues) => {
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
                <form onSubmit={handleSubmit(handleCreate)}>
                    <div className={styles.input}>
                        <div className={styles.textinput}>
                            <TextInput placeholder="Id" name="id" register={register} />
                            <TextInput placeholder="Name" name="name" register={register} />
                            <TextInput
                                placeholder="Original Name"
                                name="original_name"
                                register={register}
                            />
                        </div>

                        <div className={styles.radio}>
                            <RadioInput name="job" options={creditJobOptions} register={register} />
                        </div>
                    </div>
                    <Button variant="secondary" disabled={isLoading}>
                        Create
                    </Button>
                </form>
            </div>
            <CreditList />
        </div>
    );
};

export default Credit;
