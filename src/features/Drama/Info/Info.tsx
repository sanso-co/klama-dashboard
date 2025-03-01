import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/global/Input";
import { TextArea } from "@/components/global/TextArea";
import { Button } from "@/components/global/Button";
import { RadioInput } from "@/components/global/RadioInput";
import { DismissIcon } from "@/assets/icons/DismissIcon";

import { useUpdateShow } from "@/hooks/api/drama/useShow";
import { useSearch } from "@/hooks/api/search/useSearch";

import { MinimalShowType, LeanShowType, ShowType } from "@/types/show";

import styles from "./info.module.scss";
import common from "@/assets/styles/common.module.scss";

interface Props {
    id: number;
    show: ShowType;
}

export const Info = ({ id, show }: Props) => {
    const defaultValues = {
        name: show.name || "",
        overview: show.overview || "",
        original_overview: show.original_overview || "",
        is_custom_content: show.is_custom_content || false,
        poster_path: {
            US: { path: show.poster_path?.US?.path || "" },
            KR: { path: show.poster_path?.KR?.path || "" },
        },
        trailer: {
            site: show.trailer[0]?.site || "Youtube",
            key: show.trailer[0]?.key || "",
        },
        first_air_date: show.first_air_date || "",
        number_of_episodes: show.number_of_episodes || "",
        homepage: show.homepage || "",
        season_number: show.season_number || 1,
    };

    const methods = useForm({ defaultValues });
    const { register } = methods as unknown as UseFormReturn<FieldValues>;

    // SEARCH RELATED SEASONS
    const { query, setQuery, suggestions, setSuggestions } = useSearch();
    const [relatedShows, setRelatedShows] = useState<{ season: number; show: MinimalShowType }[]>(
        []
    );

    useEffect(() => {
        if (show?.related_seasons) {
            setRelatedShows(show.related_seasons);
        }
    }, [show]);

    const handleShowClick = (show: LeanShowType) => {
        setRelatedShows((prevShows) => [
            ...prevShows,
            {
                season: 1,
                show: {
                    _id: show._id,
                    id: show.id,
                    name: show.name,
                    original_name: show.original_name,
                    season_number: show.season_number || 1,
                },
            },
        ]);

        setQuery("");
        setSuggestions([]);
    };

    const handleSeasonChange = (index: number, newSeason: number) => {
        setRelatedShows((prevShows) =>
            prevShows.map((show, i) => (i === index ? { ...show, season: newSeason } : show))
        );
    };

    const handleShowRemove = (showId: number) => {
        setRelatedShows((prevShows) => prevShows.filter((s) => s.show.id !== showId));
    };

    // UPDATE
    const { updateShow } = useUpdateShow(id);

    const onSubmit = async (data: any) => {
        const otherSeasons = relatedShows.map((show) => ({
            season: show.season,
            show: show.show._id,
        }));
        const newData = {
            ...data,
            is_custom_content: data.is_custom_content === "Custom",
            related_seasons: otherSeasons,
        };

        try {
            await updateShow(newData);
            alert("succesfully saved");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={common.sectionTitle}>
                <h2>Primary Info</h2>
            </div>
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input name="name" label="Name" />
                    <RadioInput
                        label="Overview Type"
                        name="is_custom_content"
                        options={["Custom", "TMDB"]}
                        defaultValue={show.is_custom_content ? "Custom" : "TMDB"}
                        register={register}
                    />
                    <TextArea name="overview" label="Overview" />
                    <TextArea name="original_overview" label="Original Overview" />
                    <div className={styles.flex}>
                        <Input name="poster_path.US.path" label="US Poster Path" />
                        <Input name="poster_path.KR.path" label="KR Poster Path" />
                    </div>
                    <div className={styles.flex}>
                        <Input name="trailer.site" label="Trailer Site" />
                        <Input name="trailer.key" label="Trailer Key" />
                    </div>
                    <Input name="homepage" label="Homepage" />
                    <div className={styles.flex}>
                        <Input name="season_number" label="Season" />
                        <Input name="number_of_episodes" label="Episodes" />
                        <Input name="first_air_date" label="First Air Date" />
                    </div>
                    <div className={styles.related}>
                        <label htmlFor="related">Related Seasons</label>
                        <input
                            id="related"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search shows"
                        />
                        {suggestions.length > 0 && (
                            <ul className={styles.suggestedList}>
                                {suggestions.map((show) => (
                                    <li
                                        key={show.id}
                                        onClick={() => handleShowClick(show)}
                                        className={styles.suggestedItem}
                                    >
                                        <h3>
                                            {show.name} ({show.original_name})
                                        </h3>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {relatedShows?.length > 0 && (
                            <div className={styles.genre}>
                                {relatedShows.map((related, index) => {
                                    return (
                                        <div key={related.show._id} className={styles.relatedShow}>
                                            <input
                                                type="number"
                                                value={related.season}
                                                onChange={(e) =>
                                                    handleSeasonChange(
                                                        index,
                                                        parseInt(e.target.value, 10)
                                                    )
                                                }
                                            />
                                            <span>{`${related.show.name} ${related.show.original_name}`}</span>
                                            <button
                                                className={styles.dismiss}
                                                onClick={() => handleShowRemove(related.show.id)}
                                            >
                                                <DismissIcon width={16} height={16} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button type="submit" label="Save" variant="primary" />
                    </div>
                </form>
            </FormProvider>
        </section>
    );
};
