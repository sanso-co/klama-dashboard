import { FieldValues, useForm } from "react-hook-form";

import { useGetAllCredits, useUpdateCredit } from "@/hooks/api/credit/useCredit";

import styles from "./creditlist.module.scss";
import { RadioInput } from "@/components/global/RadioInput";
import { Button } from "@/components/global/Button";
import { Credit } from "@/interfaces/credit";
import { TextInput } from "@/components/global/TextInput";

export const CreditList = () => {
    const { register, handleSubmit, getValues } = useForm();
    const { credits, refreshCredit } = useGetAllCredits();

    const { updateCredit } = useUpdateCredit();

    const onSubmit = async (credit: Credit) => {
        const updatedOriginalName = getValues(`${credit.id}_original_name`);
        const updatedJob = getValues(`${credit.id}_job`);

        try {
            const updatedData: Credit = {
                ...credit,
                original_name: updatedOriginalName,
                job: updatedJob,
            };

            await updateCredit(updatedData);
            await refreshCredit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            {credits &&
                credits.length &&
                credits.map((credit) => (
                    <div key={credit.id} className={styles.item}>
                        <div className={styles.keyword}>
                            <div className={styles.id}>{credit.id}</div>
                            {/* <div className={styles.name}>{credit.original_name}</div> */}
                            <TextInput
                                name={`${credit.id}_original_name`}
                                register={register}
                                defaultValue={credit.original_name}
                            />
                            <div className={styles.name}>{credit.name}</div>
                            <RadioInput
                                name={`${credit.id}_job`}
                                options={["Director", "Screenwriter", "Producer", "Original Story"]}
                                defaultValue={credit.job}
                                register={register}
                            />
                            <Button label="Update" onClick={handleSubmit(() => onSubmit(credit))} />
                        </div>
                    </div>
                ))}
        </div>
    );
};
