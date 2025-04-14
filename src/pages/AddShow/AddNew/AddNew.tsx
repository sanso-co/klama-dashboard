import { FormProvider, useForm } from "react-hook-form";

import { useAddNewShow } from "@/hooks/api/drama/useShow";

import { Input } from "@/components/global/Input";
import { TextArea } from "@/components/global/TextArea";
import { Button } from "@/components/global/Button";

import styles from "./add.module.scss";

const AddNew = () => {
    const defaultValues = {
        id: "",
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
        const generateTemporaryId = (id: string, season: string) => {
            return Number(`99${season}${id}`);
        };

        const show = {
            ...data,
            id: generateTemporaryId(data.id, data.season_number),
            season_number: Number(data.season_number),
            number_of_episodes: Number(data.number_of_episodes),
            related_seasons: data.related_seasons.split(",").map(Number).filter(Boolean),
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
                    <Input name="id" label="ID" variant="sm" />
                    <div className={styles.flex}>
                        <Input name="original_name" label="Original Name" variant="sm" />
                        <Input name="name" label="Name" variant="sm" />
                    </div>
                    <div className={styles.flex}>
                        <Input name="season_number" label="Season" variant="sm" />
                        <Input name="related_seasons" label="Related Seasons" variant="sm" />
                    </div>
                    <TextArea name="original_overview" label="Original Overview" variant="sm" />
                    <TextArea name="overview" label="Overview" variant="sm" />
                    <div className={styles.flex}>
                        <Input name="poster_path.KR.path" label="KR Poster Path" variant="sm" />
                        <Input name="poster_path.US.path" label="US Poster Path" variant="sm" />
                    </div>
                    <div className={styles.flex}>
                        <Input
                            label="Add Release Date"
                            name="first_air_date"
                            type="date"
                            variant="sm"
                        />
                        <Input name="number_of_episodes" label="Number of Episodes" variant="sm" />
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default AddNew;
