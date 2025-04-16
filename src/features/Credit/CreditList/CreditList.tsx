import { useForm } from "react-hook-form";

import { useGetAllCredits, useUpdateCredit } from "@/hooks/api/credit/useCredit";

import { RadioInput } from "@/components/global/RadioInput";
import { Button } from "@/components/global/Button";
import { TextInput } from "@/components/global/TextInput";

import { CreditType } from "@/types/credit";

import styles from "./creditlist.module.scss";

export const CreditList = () => {
    const { register, handleSubmit, getValues } = useForm();
    const { credits, refreshCredit } = useGetAllCredits();

    const { updateCredit } = useUpdateCredit();

    const handleUpdate = async (credit: CreditType) => {
        const updatedOriginalName = getValues(`${credit._id}_original_name`);
        const updatedJob = getValues(`${credit._id}_job`);

        try {
            const updatedData: CreditType = {
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
                    <div key={credit._id} className={styles.item}>
                        <div className={styles.credit}>
                            <div className={styles.id}>{credit.id}</div>
                            <div className={styles.main}>
                                <div className={styles.names}>
                                    <div className={styles.name}>{credit.name}</div>
                                    <div className={styles.originalName}>
                                        <TextInput
                                            name={`${credit._id}_original_name`}
                                            register={register}
                                            defaultValue={credit.original_name}
                                            variant="sm"
                                        />
                                    </div>
                                </div>

                                <div className={styles.action}>
                                    <RadioInput
                                        name={`${credit._id}_job`}
                                        options={[
                                            "Director",
                                            "Screenwriter",
                                            "Producer",
                                            "Original Author",
                                        ]}
                                        defaultValue={credit.job}
                                        size="sm"
                                        register={register}
                                    />
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={handleSubmit(() => handleUpdate(credit))}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
