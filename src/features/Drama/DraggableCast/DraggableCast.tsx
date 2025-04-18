import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

import { useGetCastForShow, useAddCast } from "@/hooks/api/cast/useCast";
import { getProfileImage } from "@/services/image-url";

import { Modal } from "@/components/global/modal";
import { AddCast } from "./Components/AddCast";
import { Avatar } from "@/components/global/Avatar";
import { Button } from "@/components/global/Button";

import { CastType } from "@/types/cast";

import styles from "./draggable.module.scss";

interface Props {
    showId: number;
}

// a little function to help us with reordering the result
const reorder = (list: CastType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const DraggableCast = ({ showId }: Props) => {
    const { cast } = useGetCastForShow(showId);

    const [selectedCasts, setSelectedCasts] = useState<CastType[]>([]);

    useEffect(() => {
        if (cast) {
            setSelectedCasts(cast);
        }
    }, [cast]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const newItems = reorder(selectedCasts, result.source.index, result.destination.index);

        setSelectedCasts(newItems);
    };

    const { addCastForShow } = useAddCast();

    const handleOrderUpdate = async () => {
        const updatedCastsOrder = [...selectedCasts];

        updatedCastsOrder.forEach((cast, index) => {
            cast.order = index;
        });

        try {
            await addCastForShow(showId, updatedCastsOrder);
            alert("successfully added");
        } catch (error) {
            console.error(error);

            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };

                alert(axiosError.response?.data?.message || "An error occurred");
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.section}>
            <div className={styles.sectionTitle}>
                <h2>Casts</h2>
                <Button variant="primary" size="sm" onClick={() => setShowModal!(true)}>
                    Add Cast
                </Button>
                <Button variant="primary" size="sm" onClick={handleOrderUpdate}>
                    Update Order
                </Button>
            </div>
            <Modal
                header="Add a new cast"
                open={showModal}
                size="lg"
                handleClose={() => {
                    setShowModal!(false);
                }}
            >
                <AddCast existingCasts={selectedCasts} showId={showId} />
            </Modal>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className={`${styles.container} ${
                                snapshot.isDraggingOver ? styles.draggingOver : ""
                            }`}
                            {...provided.droppableProps}
                        >
                            {selectedCasts.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={provided.draggableProps.style}
                                        >
                                            <Avatar url={getProfileImage(item.profile_path)} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
