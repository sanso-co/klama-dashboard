import { useState } from "react";
import { Link } from "react-router-dom";

import { CreateShow } from "@/features/Recommendations/CreateShow";

import Modal from "@/components/global/modal";
import { RecommendCard } from "@/components/global/cards/RecommendCard";
import { Header } from "@/components/global/Header";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { useGetAllShows } from "@/hooks/api/collection/useRecommendations";

import styles from "./reco.module.scss";

const Recommendations = () => {
    const [showModal, setShowModal] = useState(false);
    const { shows } = useGetAllShows();

    return (
        <div className={styles.container}>
            <Header title="Recommendations" description="Manage recommendations for each show">
                <IconButton label="New Show" onClick={() => setShowModal!(true)}>
                    <PlusIcon />
                </IconButton>
            </Header>
            <Modal
                header="Create Collection"
                open={showModal}
                handleClose={() => {
                    setShowModal!(false);
                }}
            >
                <CreateShow closeModal={() => setShowModal(false)} />
            </Modal>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Click shows to add recommendations</h2>
                <ul className="grid-cols-8">
                    {shows?.map((show) => (
                        <Link to={show._id} key={show.id}>
                            <RecommendCard show={show} />
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Recommendations;
