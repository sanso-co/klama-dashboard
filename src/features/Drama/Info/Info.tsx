import { FormProvider, useForm } from "react-hook-form";

import { ShowDetailsResponse } from "@/interfaces/show";

import { Input } from "@/components/global/Input";
import { TextArea } from "@/components/global/TextArea";
import { Button } from "@/components/global/Button";

import styles from "./info.module.scss";
import { useUpdateShow } from "@/hooks/api/drama/useShow";

interface Props {
    id: number;
    drama: ShowDetailsResponse;
}

export const Info = ({ id, drama }: Props) => {
    const defaultValues = {
        name: drama.name || "",
        overview: drama.overview || "",
        original_overview: drama.original_overview || "",
        poster_path: {
            US: { path: drama.poster_path?.US?.path || "" },
            KR: { path: drama.poster_path?.KR?.path || "" },
        },
        first_air_date: drama.first_air_date || "",
        number_of_episodes: drama.number_of_episodes || "",
        homepage: drama.homepage || "",
    };

    const methods = useForm({ defaultValues });

    const { updateShow } = useUpdateShow(id);

    const onSubmit = async (data: any) => {
        try {
            await updateShow(data);
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Primary Info</h2>
            </div>
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input name="name" label="Name" />
                    <TextArea name="overview" label="Overview" />
                    <TextArea name="original_overview" label="Original Overview" />
                    <div className={styles.flex}>
                        <Input name="poster_path.US.path" label="US Poster Path" />
                        <Input name="poster_path.KR.path" label="KR Poster Path" />
                    </div>
                    <div className={styles.flex}>
                        <Input name="first_air_date" label="First Air Date" />
                        <Input name="number_of_episodes" label="Number of Episodes" />
                    </div>
                    <Input name="homepage" label="Homepage" />
                    <div className={styles.buttonContainer}>
                        <Button type="submit" label="Save" variant="primary" />
                    </div>
                </form>
            </FormProvider>
        </section>
    );
};
