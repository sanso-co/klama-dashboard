import { useState } from "react";
import { useParams } from "react-router-dom";

import {
    useGetPermanentDetails,
    useAddShowToPermanentCollection,
    useRemoveShowFromPermanentCollection,
} from "@/hooks/api/collection/usePermanentCollection.ts";
import { isAxiosError } from "@/helpers/axiosError";

import { Header } from "@/components/global/Header/Header.tsx";
import { AddShow } from "@/features/PermanentCollection/AddShow/AddShow.tsx";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { Modal } from "@/components/global/modal";
import { DramaCard } from "@/components/global/cards/DramaCard";

import styles from "./permanentdetails.module.scss";

const PermanentDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [showModal, setShowModal] = useState(false);

    if (!id) {
        return <p>Error: ID is required.</p>;
    }

    const { details, refetch } = useGetPermanentDetails(id);
    const { addShowToPermanent } = useAddShowToPermanentCollection(id);
    const { removeShowFromPermanent } = useRemoveShowFromPermanentCollection(Number(id));

    const onShowSubmit = async (showObjId: string) => {
        try {
            await addShowToPermanent(showObjId);
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

    const onRemove = async (id: number) => {
        try {
            await removeShowFromPermanent(id);
            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full">
            <Header title={details?.name || ""} description={details?.description || ""}>
                <IconButton label="Add Show" onClick={() => setShowModal!(true)}>
                    <PlusIcon />
                </IconButton>
            </Header>

            <Modal
                header="Add a show to the collection"
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
                    {details?.results.map((show) => (
                        <DramaCard
                            key={show.id}
                            show={show}
                            showRemoveButton
                            overlayclick={() => onRemove(show.id)}
                        />
                    ))}
                </div>
                <div>pagination</div>
            </div>
        </div>
    );
};

export default PermanentDetails;
