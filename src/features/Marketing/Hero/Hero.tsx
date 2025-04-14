import { useEffect } from "react";
import { useFieldArray, FormProvider, useForm } from "react-hook-form";

import {
    useCreateHero,
    useGetAllHero,
    useRemoveHero,
    useUpdateHero,
} from "@/hooks/api/marketing/useMarketing";

import { ImageUpload } from "@/components/global/ImageUpload";
import { Button } from "@/components/global/Button";
import { Input } from "@/components/global/Input";

import { HeroType } from "@/types/marketing";

import styles from "./hero.module.scss";

// Define a type specifically for the form values
interface HeroFormValues {
    heroItems: (HeroType & { id?: string })[];
}

export const Hero = () => {
    const { heroes } = useGetAllHero();
    const { createHero } = useCreateHero();
    const { removeHero } = useRemoveHero();
    const { updateHero } = useUpdateHero();

    const methods = useForm<HeroFormValues>({
        defaultValues: {
            heroItems: [
                {
                    img: null,
                    title: "",
                    tagline: "",
                    tag: {
                        label: "",
                        color: "#000000",
                    },
                    url: "",
                    order: 1,
                    _id: undefined,
                },
            ],
        },
    });

    const { control, reset } = methods;
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "heroItems",
        keyName: "fieldId", // Use a different key name to avoid conflicts with _id
    });

    useEffect(() => {
        if (heroes && heroes.length > 0) {
            const existingHeroes = heroes.map((hero) => ({
                img: hero.img,
                title: hero.title,
                tagline: hero.tagline || "",
                tag: hero.tag || {
                    label: "",
                    color: "#000000",
                },
                url: hero.url,
                order: hero.order,
                _id: hero._id,
            }));

            // Use type assertion to match the expected types
            reset({ heroItems: existingHeroes as HeroFormValues["heroItems"] });
        }
    }, [heroes, reset]);

    const addItem = () => {
        const newOrder = fields.length + 1;
        append({
            img: null,
            title: "",
            tagline: "",
            tag: {
                label: "",
                color: "#000000",
            },
            url: "",
            order: newOrder,
            _id: undefined,
        });
    };

    const handleSave = async (item: HeroType, index: number) => {
        try {
            const response = await createHero(item);
            update(index, { ...item, _id: response._id });
            alert("Successfully Created");
        } catch (error) {
            console.error("Error adding hero item:", error);
            alert("Error adding hero item");
        }
    };

    const removeItem = async (index: number, heroId?: string) => {
        try {
            remove(index);

            if (heroId) {
                await removeHero(heroId);
                alert("Hero item removed successfully");
            }

            // Reorder remaining items
            const updatedFields = methods.getValues().heroItems.filter((_, i) => i !== index);
            updatedFields.forEach((item, i) => {
                update(i, { ...item, order: i + 1 });
            });
        } catch (error) {
            console.error("Error removing hero item:", error);
            alert("Error removing hero item");
        }
    };

    const handleUpdate = async (item: HeroType) => {
        try {
            if (item._id) {
                await updateHero(item._id, item);
                alert("Successfully Updated");
            }
        } catch (error) {
            console.error("Error updating hero item:", error);
            alert("Error updating hero item");
        }
    };

    const handleImageSelect = (index: number, image: any) => {
        const currentItem = methods.getValues().heroItems[index];
        update(index, { ...currentItem, img: image });
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Hero</h2>
            </div>

            <FormProvider {...methods}>
                {fields.map((field, index) => (
                    <div key={field.fieldId} className={styles.heroItem}>
                        <ImageUpload
                            image={field.img}
                            onImageSelect={(image) => handleImageSelect(index, image)}
                        />
                        <div className={styles.details}>
                            <Input
                                name={`heroItems.${index}.order`}
                                label="Order"
                                variant="sm"
                                type="number"
                            />
                            <Input name={`heroItems.${index}.title`} label="Title" variant="sm" />
                            <div className={styles.flex}>
                                <div className={styles.tagInputs}>
                                    <Input
                                        name={`heroItems.${index}.tag.color`}
                                        label="Tag Color"
                                        variant="sm"
                                        type="color"
                                    />
                                    <Input
                                        name={`heroItems.${index}.tag.label`}
                                        label="Tag Label"
                                        variant="sm"
                                    />
                                </div>
                                <Input
                                    name={`heroItems.${index}.url`}
                                    label="URL"
                                    variant="sm"
                                    className={styles.url}
                                />
                            </div>
                            <div>
                                <Input
                                    name={`heroItems.${index}.tagline`}
                                    label="Tagline"
                                    variant="sm"
                                />
                            </div>
                            <div>
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        variant="tertiary"
                                        size="sm"
                                        onClick={() => removeItem(index, field._id)}
                                    >
                                        Remove
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        field._id
                                            ? handleUpdate(methods.getValues().heroItems[index])
                                            : handleSave(
                                                  methods.getValues().heroItems[index],
                                                  index
                                              )
                                    }
                                >
                                    {field._id ? "Update" : "Save"}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="primary" onClick={addItem}>
                    + Add Another Item
                </Button>
            </FormProvider>
        </section>
    );
};
