import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAllPeriodic } from "@/hooks/api/collection/usePeriodicCollection";

import { CreateNew } from "@/features/PeriodicCollection/CreateNew";
import { Modal } from "@/components/global/modal";
import { Header } from "@/components/global/Header";
import { IconButton } from "@/components/global/IconButton";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { Table } from "@/components/global/Table";

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
    {
        key: "frequency",
        header: "Frequency",
        width: 2,
    },
];

const PeriodicCollection = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { collections, isLoading, error } = useGetAllPeriodic();

    const onGroupSubmit = (id: string) => {
        setShowModal(false);
        navigate(`/periodic-collection/${id}`);
    };

    const tableData = collections.map((c) => {
        return {
            _id: c._id,
            id: `...${c._id.slice(-5)}`,
            name: c.name,
            frequency: c.frequency,
        };
    });

    const handleRowClick = (row: { _id: string }) => {
        navigate(`/periodic-collection/${row._id}`);
    };

    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Failed to load</div>;
    if (!collections || collections.length === 0) return null;

    return (
        <div>
            <Header
                title="Periodic Collections"
                primaryDescription="
                        Regularly updated content, weekly, quarterly, or on your own schedule."
            >
                <IconButton label="Create New Collection" onClick={() => setShowModal!(true)}>
                    <PlusIcon />
                </IconButton>
                <Modal
                    header="Create a Periodic Collection"
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

export default PeriodicCollection;
