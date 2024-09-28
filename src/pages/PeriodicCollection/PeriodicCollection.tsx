import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useGetAllPeriodic } from "@/hooks/api/collection/usePeriodicCollection";

import CreateNewPeriodic from "../../features/PeriodicCollection/CreateNewPeriodic";
import Modal from "@/components/global/modal";
import { IconButton } from "@/components/global/IconButton";
import { Header } from "@/components/global/Header";
import { PlusIcon } from "@/assets/icons/PlusIcon";

import styles from "./periodiccollection.module.scss";

const PeriodicCollection = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { collections, isLoading, error } = useGetAllPeriodic();

    const onGroupSubmit = (id: string) => {
        setShowModal(false);
        navigate(`/periodic-collection/${id}`);
    };

    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Failed to load</div>;
    if (!collections || collections.length === 0) return null;

    return (
        <div>
            <Header
                title="Periodic Collections"
                description="
                        Regularly updated content, weekly, quarterly, or on your own schedule."
            >
                <IconButton label="New Collection" onClick={() => setShowModal!(true)}>
                    <PlusIcon />
                </IconButton>
                <Modal
                    header="Create Collection"
                    open={showModal}
                    handleClose={() => {
                        setShowModal!(false);
                    }}
                >
                    <CreateNewPeriodic onSuccess={(id) => onGroupSubmit(id)} />
                </Modal>
            </Header>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Collections</h2>
                <ul>
                    {collections.map((collection) => (
                        <li key={collection._id} className={styles.item}>
                            <Link to={`/periodic-collection/${collection._id}`}>
                                {collection.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PeriodicCollection;
