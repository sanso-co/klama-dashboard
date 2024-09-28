import { useState } from "react";
import { useParams } from "react-router-dom";

import {
    useGetPeriodicDetails,
    useAddListToPeriodicCollection,
} from "@/hooks/api/collection/usePeriodicCollection.ts";
import { formatDate } from "@/helper/date";

import { CreateNewCollection } from "../../features/PeriodicCollection/CreateNewCollection";
import Modal from "@/components/global/modal";
import { Header } from "@/components/global/Header";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { List } from "@/interfaces/periodic.ts";

import styles from "./periodicdetails.module.scss";

const PeriodicDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [showModal, setShowModal] = useState(false);

    const { details, isLoading, error } = useGetPeriodicDetails(id as string);
    const { addListToPeriodic } = useAddListToPeriodicCollection(id as string);

    const onNewListSubmit = async (data: List) => {
        try {
            await addListToPeriodic(data);
            setShowModal!(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Failed to load</div>;
    if (!details || details.lists?.length === 0) return null;

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
                    <CreateNewCollection onSubmit={onNewListSubmit} />
                </Modal>
            </Header>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Past List</h2>
                <ul>
                    {details.lists?.map((list) => (
                        <li key={list.releaseDate} className={styles.listItem}>
                            {formatDate(list.releaseDate)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PeriodicDetails;
