import { useSearch } from "@/hooks/api/search/useSearch";
import {
    useAddShowToRecommendations,
    useGetsRecommendationsDetails,
} from "@/hooks/api/recommendations/useRecommendations";

import { DramaCard } from "@/components/global/cards/DramaCard";

import { LeanShowType } from "@/interfaces/show";

import styles from "./reco.module.scss";
import { Link } from "react-router-dom";

interface Props {
    showId: number;
}

export const Recommendations = ({ showId }: Props) => {
    const { query, setQuery, suggestions, setSuggestions } = useSearch();
    const { addShowToRecommendation } = useAddShowToRecommendations();
    const { details, refetch } = useGetsRecommendationsDetails(showId);

    const onShowClick = async (show: LeanShowType) => {
        try {
            addShowToRecommendation(showId, show.id);
            setSuggestions([]);
            refetch();
            alert("recommendation saved successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Recommendations</h2>
            </div>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shows"
                className={styles.input}
            />
            <div className="grid-cols-8">
                {suggestions.map((show) => (
                    <div key={show.id} onClick={() => onShowClick(show)}>
                        <DramaCard show={show} />
                    </div>
                ))}
            </div>
            <div className={styles.cardsContainer}>
                {details?.shows.map((show) => (
                    <Link to={`/dramas/${show.id}`} key={show.id}>
                        <DramaCard show={show} />
                    </Link>
                ))}
            </div>
        </section>
    );
};
