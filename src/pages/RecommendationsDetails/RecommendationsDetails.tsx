import { useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";

import {
    useAddShowToRecommendations,
    useGetsRecommendationsDetails,
} from "@/hooks/api/collection/useRecommendations";
import { useTMDBSearch } from "@/hooks/api/useTMDBSearch";

import { AddShow } from "@/features/Recommendations/AddShow";

import Modal from "@/components/global/modal";
import { Header } from "@/components/global/Header";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { TMDBShow } from "@/interfaces/search";

import styles from "./reco.module.scss";

const RecommendationsDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [showModal, setShowModal] = useState(false);
    const { clearSearchTerm } = useTMDBSearch();

    //GET DETAILS OF THE SHOW
    if (!id) {
        return <p>Error: ID is required.</p>;
    }

    const { details, refetch } = useGetsRecommendationsDetails(id);

    //ADD SHOW
    const { addShowToRecommendations } = useAddShowToRecommendations(id);
    const onShowSubmit = async (show: TMDBShow) => {
        try {
            await addShowToRecommendations(show);
            setShowModal(false);
            clearSearchTerm();
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

    return (
        <div>
            <Header title={details?.details.name || ""}>
                <IconButton label="Add Recommendations" onClick={() => setShowModal!(true)}>
                    <PlusIcon />
                </IconButton>
            </Header>
            <Modal
                header="Add a new collection"
                open={showModal}
                size="lg"
                handleClose={() => {
                    setShowModal!(false);
                    clearSearchTerm();
                }}
            >
                <AddShow onSubmit={onShowSubmit} />
            </Modal>
            <div className={styles.list}>
                <h2 className={styles.listHeader}>Recommended Shows</h2>
                <div className="grid-cols-8">
                    {details?.results?.shows?.map((show) => (
                        <DramaCard key={show.id} show={show} showRemoveButton />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendationsDetails;
