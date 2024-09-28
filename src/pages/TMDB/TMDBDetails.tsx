import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { useGetShowDetails } from "@/hooks/api/TMDB/useTMDB";
import { useAddShow } from "@/hooks/api/drama/useShow";
import { getCroppedImageUrl } from "@/services/image-url";

import { Provider } from "@/features/TMDB/Provider";
import { Button } from "@/components/global/Button";
import { ImageContainer } from "@/components/global/containers/ImageContainer";
import { Show } from "@/interfaces/show";
import { ratio } from "@/components/global/token";

import styles from "./tmdb.module.scss";

const TMDB = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useGetShowDetails(id as string);

    const { addShow } = useAddShow();

    const handleDramaAdd = async () => {
        const show: Show = {
            id: Number(data?.id),
            name: data?.name ?? "",
            original_name: data?.original_name ?? "",
            poster_path: {
                US: {
                    path: data?.poster_path ?? "",
                },
            },
            genres: data?.genres ?? [],
            overview: data?.overview ?? "",
            first_air_date: data?.first_air_date ?? "",
            number_of_episodes: data?.number_of_episodes ?? 1,
            homepage: data?.homepage ?? "",
            networks: data?.networks ?? [],
            production_companies: data?.production_companies ?? [],
            created_by: data?.created_by ?? [],
        };

        try {
            await addShow(show);
            alert("successfully added");
        } catch (error) {
            console.error(error);
            alert("already added");
        }
    };

    if (isLoading) return <div>Loading Show...</div>;
    if (!data) return <div>Show not available</div>;

    return (
        <div>
            <Helmet>
                <title>TMDB-Details</title>
            </Helmet>
            <div className={styles.details}>
                <ImageContainer
                    src={getCroppedImageUrl(data.poster_path)}
                    ratio={ratio.portrait_23}
                    rounded="0.75rem"
                />
                <div className={styles.info}>
                    <div className={styles.name}>{data.original_name}</div>
                    <Button label="Add Show" variant="primary" onClick={handleDramaAdd} />
                </div>
            </div>
            <Provider showId={data.id} />
        </div>
    );
};

export default TMDB;
