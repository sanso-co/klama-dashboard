import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    useGetPeriodicDetails,
    useAddListToPeriodicCollection,
} from "@/hooks/api/collection/usePeriodicCollection.ts";
import { formatDate } from "@/helpers/date";

import { CreateList } from "@/features/PeriodicCollection/CreateList";
import { Modal } from "@/components/global/modal";
import { Header } from "@/components/global/Header";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";

import { CollectionListType } from "@/types/periodic";

import styles from "./periodicdetails.module.scss";

const PeriodicDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [showModal, setShowModal] = useState(false);

    const { details, isLoading, error } = useGetPeriodicDetails(id as string);
    const { addListToPeriodic } = useAddListToPeriodicCollection(id as string);

    const onNewListSubmit = async (data: CollectionListType) => {
        try {
            await addListToPeriodic(data);
            setShowModal!(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Failed to load</div>;
    if (!details) return null;

    return (
        <div className="w-full">
            <Header title={details?.name || ""} description={details?.description}>
                <IconButton label="Add New List" onClick={() => setShowModal!(true)}>
                    <PlusIcon />
                </IconButton>
                <Modal
                    header="Add a new collection"
                    open={showModal}
                    size="lg"
                    handleClose={() => {
                        setShowModal!(false);
                    }}
                >
                    <CreateList onSubmit={onNewListSubmit} />
                </Modal>
            </Header>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Past List</h2>
                <ul>
                    {details.lists?.map((list) => (
                        <Link
                            to={`/periodic-collection/${id}/sub/${list._id}`}
                            key={list.releaseDate}
                        >
                            <li className={styles.listItem}>{formatDate(list.releaseDate)}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PeriodicDetails;
