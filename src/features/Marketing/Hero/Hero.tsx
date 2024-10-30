import { useEffect, useState } from "react";

import { useCreateHero, useGetAllHero } from "@/hooks/api/marketing/useMarketing";

import { ImageUpload } from "@/components/global/ImageUpload";
import { Button } from "@/components/global/Button";

import { HeroType } from "@/interfaces/marketing";

import styles from "./hero.module.scss";

export const Hero = () => {
    const { heroes } = useGetAllHero();
    const [heroItems, setHeroItems] = useState<HeroType[]>([
        {
            img: null,
            title: "",
            tag: {
                label: "",
                color: "#000000",
            },
            url: "",
            order: 1,
        },
    ]);

    useEffect(() => {
        if (heroes && heroes.length > 0) {
            const existingHeroes = heroes.map((hero) => ({
                img: hero.img,
                title: hero.title,
                tag: hero.tag || {
                    label: "",
                    color: "#000000",
                },
                url: hero.url,
                order: hero.order,
            }));
            setHeroItems(existingHeroes);
        }
    }, [heroes]);

    const handleInputChange = (order: number, field: string, value: any) => {
        setHeroItems((prevItems) =>
            prevItems.map((item): HeroType => {
                if (item.order === order) {
                    if (field === "tagLabel" || field === "tagColor") {
                        const updatedTag = {
                            label: field === "tagLabel" ? value : item.tag?.label || "",
                            color: field === "tagColor" ? value : item.tag?.color || "#000000",
                        };
                        return {
                            ...item,
                            tag: updatedTag,
                        };
                    }
                    return { ...item, [field]: value };
                }
                return item;
            })
        );
    };

    const addItem = () => {
        const newOrder = heroItems.length + 1;
        setHeroItems([
            ...heroItems,
            {
                img: null,
                title: "",
                tag: {
                    label: "",
                    color: "#000000",
                },
                url: "",
                order: newOrder,
            },
        ]);
    };

    const removeItem = (order: number) => {
        setHeroItems((prevItems) => {
            const newItems = prevItems.filter((item) => item.order !== order);
            return newItems.map((item, index) => ({ ...item, order: index + 1 }));
        });
    };

    const { createHero } = useCreateHero();

    const handleSubmit = (item: HeroType) => {
        try {
            createHero(item);
            alert("Successfully Created");
        } catch (error) {
            console.error("Error adding hero item:", error);
            alert("Error adding hero item");
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Hero</h2>
            </div>

            {heroItems.map((item) => (
                <div key={item.order} className={styles.heroItem}>
                    <ImageUpload
                        image={item.img}
                        onImageSelect={(image) => handleInputChange(item.order, "img", image)}
                    />
                    <div className={styles.details}>
                        <input
                            type="text"
                            value={item.order}
                            onChange={(e) => handleInputChange(item.order, "order", e.target.value)}
                            placeholder="Order"
                        />
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleInputChange(item.order, "title", e.target.value)}
                            placeholder="Title"
                        />
                        <div className={styles.flex}>
                            <div className={styles.tagInputs}>
                                <input
                                    type="color"
                                    value={item.tag?.color || "#000000"}
                                    onChange={(e) =>
                                        handleInputChange(item.order, "tagColor", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    value={item.tag?.label || ""}
                                    onChange={(e) =>
                                        handleInputChange(item.order, "tagLabel", e.target.value)
                                    }
                                    placeholder="Tag Label"
                                />
                            </div>
                            <input
                                type="text"
                                value={item.url}
                                onChange={(e) =>
                                    handleInputChange(item.order, "url", e.target.value)
                                }
                                placeholder="URL"
                                className={styles.url}
                            />
                        </div>
                        {item.order > 1 && (
                            <Button
                                type="button"
                                label="Remove"
                                variant="tertiary"
                                onClick={() => removeItem(item.order)}
                            />
                        )}
                        <Button
                            type="button"
                            label="Save"
                            variant="primary"
                            onClick={() => handleSubmit(item)}
                        />
                    </div>
                </div>
            ))}
            <Button
                type="button"
                label="+ Add Another Item"
                variant="secondary"
                onClick={addItem}
            />
        </section>
    );
};
