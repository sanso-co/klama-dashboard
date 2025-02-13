// hooks/useShowData.ts
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetPermanentDetails,
    useAddShowToPermanentCollection,
    useRemoveShowFromPermanentCollection,
} from "@/hooks/api/collection/usePermanentCollection.ts";
import { isAxiosError } from "@/helpers/axiosError";
import { SortType } from "@/types/sort";

export const usePermanentDetailsData = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortType>("original_name_asc");
    const [showModal, setShowModal] = useState(false);

    const { isLoading, details, refetch } = useGetPermanentDetails(id ?? "", page, sort);
    const { addShowToPermanent } = useAddShowToPermanentCollection(id ?? "");

    const handleSort = (option: SortType) => {
        setSort(option);
        // setIsDrawerOpen(false);
    };

    const onShowSubmit = async (showObjId: string) => {
        try {
            await addShowToPermanent(showObjId);
            setShowModal(false);

            setTimeout(() => {
                refetch();
            }, 100);
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
    console.log("permanent", page);
    return {
        isLoading,
        page,
        sort,
        details,
        showModal,
        refetch,
        setPage,
        handleSort,
        setShowModal,
        onShowSubmit,
    };
};
