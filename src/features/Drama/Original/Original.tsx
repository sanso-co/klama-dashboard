import { FormProvider, useForm } from "react-hook-form";

import { useUpdateShow } from "@/hooks/api/drama/useShow";

import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";

import { ShowType } from "@/types/show";

import styles from "./original.module.scss";

interface Props {
    id: number;
    show: ShowType;
}

export const Original = ({ id, show }: Props) => {
    const defaultValues = {
        original_story: {
            title: {
                title: show.original_story?.title?.title || "",
                korean_title: show.original_story?.title?.korean_title || "",
            },
            author: {
                name: show.original_story?.author?.name || "",
                korean_name: show.original_story?.author?.korean_name || "",
            },
        },
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
                <h2>Original Story</h2>
            </div>
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.flex}>
                        <Input name="original_story.title.title" label="Title" />
                        <Input name="original_story.author.name" label="Author: Name" />
                    </div>
                    <div className={styles.flex}>
                        <Input name="original_story.title.korean_title" label="Korean Title" />
                        <Input
                            name="original_story.author.korean_name"
                            label="Author: Korean Name"
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button type="submit" label="Save" variant="primary" />
                    </div>
                </form>
            </FormProvider>
        </section>
    );
};
