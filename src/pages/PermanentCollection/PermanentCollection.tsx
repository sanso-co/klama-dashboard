import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useGetAllPermanent } from "@/hooks/api/collection/usePermanentCollection";

import { CreateNew } from "@/features/PermanentCollection/CreateNew";
import { Modal } from "@/components/global/modal";
import { IconButton } from "@/components/global/IconButton";
import { Header } from "@/components/global/Header";
import { Table } from "@/components/global/Table";

import { PlusIcon } from "@/assets/icons/PlusIcon";

import common from "@/assets/styles/common.module.scss";

const serviceColumns = [
    {
        key: "id",
        header: "Id",
        width: 1,
    },
    {
        key: "name",
        header: "Name",
        width: 3,
    },
];

const PermanentCollection = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { collections, isLoading, error } = useGetAllPermanent();

    const onGroupSubmit = (id: string) => {
        setShowModal(false);
        navigate(`/permanent-collection/${id}`);
    };

    const tableData = collections.map((c) => {
        return {
            _id: c._id,
            id: `...${c._id.slice(-5)}`,
            name: c.name,
        };
    });

    const handleRowClick = (row: { _id: string }) => {
        navigate(`/permanent-collection/${row._id}`);
    };

    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Failed to load</div>;
    if (!collections || collections.length === 0) return null;

    return (
        <div>
            <Header
                title="Permanent Collections"
                primaryDescription="A timeless collection, with conents added continually"
            >
                <IconButton label="New Collection" onClick={() => setShowModal!(true)}>
                    <PlusIcon width={18} height={18} stroke={1.5} />
                </IconButton>
                <Modal
                    header="Create Collection"
                    open={showModal}
                    handleClose={() => {
                        setShowModal!(false);
                    }}
                >
                    <CreateNew onSuccess={(id) => onGroupSubmit(id)} />
                </Modal>
            </Header>
            <h2 className={common.listHeader}>Collection List</h2>
            <Table columns={serviceColumns} data={tableData} onRowClick={handleRowClick} />
        </div>
    );
};

export default PermanentCollection;
