import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

import { useSearch } from "@/hooks/api/search/useSearch";
import {
    useAddShowToRecommendations,
    useUpdateRecommendations,
    useGetsRecommendationsDetails,
} from "@/hooks/api/recommendations/useRecommendations";

import { DramaCard } from "@/components/global/cards/DramaCard";

import { LeanShowType } from "@/interfaces/show";

import styles from "./reco.module.scss";

interface Props {
    showId: number;
}

const reorder = (list: LeanShowType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const Recommendations = ({ showId }: Props) => {
    const { query, setQuery, suggestions, setSuggestions } = useSearch();
    const { addShowToRecommendation } = useAddShowToRecommendations();
    const { updateRecommendations } = useUpdateRecommendations();
    const { details, refetch } = useGetsRecommendationsDetails(showId);

    const [orderedShows, setOrderedShows] = useState<LeanShowType[]>([]);

    useEffect(() => {
        if (details?.shows) {
            setOrderedShows(details.shows);
        }
    }, [details]);

    const onShowClick = async (show: LeanShowType) => {
        try {
            await addShowToRecommendation(showId, show.id);
            setSuggestions([]);
            refetch();
            alert("recommendation saved successfully");
        } catch (error) {
            console.error(error);
        }
    };

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const newItems = reorder(orderedShows, result.source.index, result.destination.index);

        setOrderedShows(newItems);

        try {
            const showIds = newItems.map((show) => show._id);
            await updateRecommendations(showId, showIds);
            alert("Reorder successful");
            refetch();
        } catch (error) {
            console.error(error);
            alert("Failed to save the new order");
            if (details?.shows) {
                setOrderedShows(details.shows);
            }
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

            <div className={styles.suggestions}>
                {suggestions.map((show) => (
                    <div key={show.id} onClick={() => onShowClick(show)}>
                        <DramaCard show={show} />
                    </div>
                ))}
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className={`${styles.cardsContainer} ${
                                snapshot.isDraggingOver ? styles.draggingOver : ""
                            }`}
                            {...provided.droppableProps}
                        >
                            {orderedShows.map((show, index) => (
                                <Draggable
                                    key={show.id}
                                    draggableId={show.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={snapshot.isDragging ? styles.dragging : ""}
                                        >
                                            <Link to={`/dramas/${show.id}`}>
                                                <DramaCard show={show} />
                                            </Link>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    );
};
