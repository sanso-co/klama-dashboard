import { useState } from "react";
import { useGetAllShow } from "@/hooks/api/show/useShow";
import { SortType } from "@/types/sort";

export const useShowData = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortType>("date_desc");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { shows } = useGetAllShow(page, sort);

    const handleSort = (option: SortType) => {
        setSort(option);
        setIsDrawerOpen(false);
    };

    return {
        page,
        sort,
        shows,
        isDrawerOpen,
        setPage,
        setIsDrawerOpen,
        handleSort,
    };
};
