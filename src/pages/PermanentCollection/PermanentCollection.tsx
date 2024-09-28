import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useGetAllPermanent } from "@/hooks/api/collection/usePermanentCollection";

import { CreateNewPermanent } from "@/features/PermanentCollection/CreateNewPermanent";
import Modal from "@/components/global/modal";
import { IconButton } from "@/components/global/IconButton";
import { Header } from "@/components/global/Header";
import { PlusIcon } from "@/assets/icons/PlusIcon";

import styles from "./permanentcollection.module.scss";

const PermanentCollection = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { collections, isLoading, error } = useGetAllPermanent();

    const onGroupSubmit = (id: string) => {
        setShowModal(false);
        navigate(`/permanent-collection/${id}`);
    };

    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Failed to load</div>;
    if (!collections || collections.length === 0) return null;

    return (
        <div>
            <Header
                title="Permanent Collections"
                description="A timeless collection, with conents added continually"
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
                    <CreateNewPermanent onSuccess={(id) => onGroupSubmit(id)} />
                </Modal>
            </Header>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Collections</h2>
                {collections.map((collection) => (
                    <Link key={collection._id} to={`/permanent-collection/${collection._id}`}>
                        {collection.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PermanentCollection;
