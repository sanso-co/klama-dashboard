import { FormProvider, useForm } from "react-hook-form";

import { useAddNewShow } from "@/hooks/api/drama/useShow";

import { Input } from "@/components/global/Input";
import { TextArea } from "@/components/global/TextArea";
import { Button } from "@/components/global/Button";

import styles from "./add.module.scss";

const AddNew = () => {
    const defaultValues = {
        name: "",
        original_name: "",
        overview: "",
        original_overview: "",
        poster_path: {
            US: { path: "" },
            KR: { path: "" },
        },
        first_air_date: "",
        number_of_episodes: "",
        season_number: "",
        related_seasons: [],
    };

    const methods = useForm({ defaultValues });

    const { addShow } = useAddNewShow();

    const onSubmit = async (data: any) => {
        const generateTemporaryId = (date: string): number => {
            const numericDate = date.replace(/-/g, "");
            return Number(`99${numericDate}`);
        };

        const show = {
            ...data,
            season_number: Number(data.season_number),
            number_of_episodes: Number(data.number_of_episodes),
            related_seasons: data.related_seasons.split(",").map(Number).filter(Boolean),
            id: generateTemporaryId(data.first_air_date),
        };

        try {
            await addShow(show);
            alert("successfully added");
        } catch (error) {
            console.error(error);
            alert("already added");
        }
    };

    return (
        <div>
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.flex}>
                        <Input name="original_name" label="Original Name" />
                        <Input name="name" label="Name" />
                    </div>
                    <div className={styles.flex}>
                        <Input name="season_number" label="Season" />
                        <Input name="related_seasons" label="Related Seasons" />
                    </div>
                    <TextArea name="original_overview" label="Original Overview" />
                    <TextArea name="overview" label="Overview" />
                    <div className={styles.flex}>
                        <Input name="poster_path.KR.path" label="KR Poster Path" />
                        <Input name="poster_path.US.path" label="US Poster Path" />
                    </div>
                    <div className={styles.flex}>
                        <Input label="Add Release Date" name="first_air_date" type="date" />
                        <Input name="number_of_episodes" label="Number of Episodes" />
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button type="submit" label="Save" variant="primary" />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default AddNew;
