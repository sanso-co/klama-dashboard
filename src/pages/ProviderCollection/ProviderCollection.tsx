import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "@/components/global/Header";
import Modal from "@/components/global/modal";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";

import { CreateNewProvider } from "@/features/ProviderCollection/CreateNewProvider";

import { useGetAllProvider } from "@/hooks/api/collection/useProviderCollection";

import styles from "./providercollection.module.scss";

const ProviderCollection = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { collections } = useGetAllProvider();

    const onGroupSubmit = (id: string) => {
        setShowModal(false);
        navigate(`/provider-collection/${id}`);
    };

    return (
        <div>
            <Header
                title="Provider Collections"
                description="Collection that belongs to a specific provider"
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
                    <CreateNewProvider onSuccess={(id) => onGroupSubmit(id)} />
                </Modal>
            </Header>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Collections</h2>
                {collections.map((collection) => (
                    <div key={collection._id}>{collection.name}</div>
                ))}
            </div>
        </div>
    );
};

export default ProviderCollection;
