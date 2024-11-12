import { useState } from "react";
import { useParams } from "react-router-dom";

import {
    useGetPeriodicSubDetails,
    useAddShowToPeriodicList,
    useRemoveShowFromPeriodicList,
} from "@/hooks/api/collection/usePeriodicCollection.ts";

import { formatMonth } from "@/helper/date";
import { isAxiosError } from "@/helper/axiosError";

import { AddShow } from "@/features/AddShow";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { Modal } from "@/components/global/modal";
import { Header } from "@/components/global/Header";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";

import styles from "./periodicdetails.module.scss";

const PeriodicDetailsSub = () => {
    const { collectionId, listId } = useParams<{ collectionId: string; listId: string }>();
    const [showModal, setShowModal] = useState(false);

    const { list, isLoading, error, refetch } = useGetPeriodicSubDetails(
        collectionId as string,
        listId as string
    );

    const updatedMonth = formatMonth(list?.releaseDate);

    const { addShowToPeriodicList } = useAddShowToPeriodicList(collectionId || "", listId || "");
    const { removeShowFromPeriodicList } = useRemoveShowFromPeriodicList(
        collectionId || "",
        listId || ""
    );

    const onShowSubmit = async (showId: string) => {
        try {
            await addShowToPeriodicList(showId);
            setShowModal(false);
            await refetch();
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                alert(error.response?.data?.message || "An error occurred");
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
            console.error("front error", error);
        }
    };

    const onRemove = async (showId: string) => {
        try {
            await removeShowFromPeriodicList(showId);
            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Failed to load</div>;
    if (!list) return null;

    return (
        <div className="w-full">
            <Header title={updatedMonth || ""}>
                <IconButton label="Add Show" onClick={() => setShowModal!(true)}>
                    <PlusIcon />
                </IconButton>
            </Header>
            <Modal
                header="Add a new collection"
                open={showModal}
                size="lg"
                handleClose={() => {
                    setShowModal!(false);
                }}
            >
                <AddShow onSubmit={onShowSubmit} />
            </Modal>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Shows</h2>
                <div className={styles.showList}>
                    {list?.shows.map((show) => (
                        <DramaCard
                            key={show.id}
                            show={show}
                            showRemoveButton
                            overlayclick={() => onRemove(show._id)}
                        />
                    ))}
                </div>
                <div>pagination</div>
            </div>
        </div>
    );
};

export default PeriodicDetailsSub;
