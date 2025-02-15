import { sortOptions } from "@/helpers/constants/options";
import { useRemoveShowFromPermanentCollection } from "@/hooks/api/collection/usePermanentCollection";
import { usePermanentDetailsData } from "./hook/usePermanentDetailsData";

import { Sort } from "@/features/Shows/Sort";
import { Header } from "@/components/global/Header/Header.tsx";
import { AddShow } from "@/features/PermanentCollection/AddShow/AddShow.tsx";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { Modal } from "@/components/global/modal";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { Pagination } from "@/components/global/Pagination";

import styles from "./permanentdetails.module.scss";

const PermanentDetails = () => {
    const {
        id,
        isLoading,
        page,
        sort,
        showModal,
        details,
        refetch,
        setPage,
        handleSort,
        setShowModal,
        onShowSubmit,
    } = usePermanentDetailsData();

    const { removeShowFromPermanent } = useRemoveShowFromPermanentCollection(Number(id));

    const onRemove = async (id: number) => {
        try {
            await removeShowFromPermanent(id);
            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
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
                <div className={styles.subHeader}>
                    <div className={styles.subTop}>
                        <h2 className={styles.listHeader}>Shows</h2>
                        <Sort
                            options={sortOptions}
                            selected={sort}
                            onSortSelect={(option) => handleSort(option)}
                        />
                    </div>
                </div>
                <div className={styles.showList}>
                    {details?.results && details.results.length > 0 ? (
                        details.results.map((show) => (
                            <DramaCard
                                key={show.id}
                                show={show}
                                showRemoveButton
                                overlayclick={() => onRemove(show.id)}
                            />
                        ))
                    ) : (
                        <p>No shows found</p>
                    )}
                </div>
            </div>
            <Pagination
                currentPage={page}
                totalPages={details?.totalPages || 0}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
};

export default PermanentDetails;
