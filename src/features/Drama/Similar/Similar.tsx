import { Link } from "react-router-dom";

import { useGetSimilarRecommendations } from "@/hooks/api/similar/useSimilar";

import { DramaCard } from "@/components/global/cards/DramaCard";

import styles from "./similar.module.scss";

interface Props {
    showId: number;
}

export const Similar = ({ showId }: Props) => {
    const { similar } = useGetSimilarRecommendations(showId);

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Similar</h2>
            </div>
            <div className={styles.cardsContainer}>
                {similar?.map((show) => (
                    <div key={show.id}>
                        <Link to={`/dramas/${show.id}`}>
                            <DramaCard show={show} />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};
