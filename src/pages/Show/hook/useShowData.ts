// hooks/useShowData.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllShow } from "@/hooks/api/show/useShow";
import { useSearch } from "@/hooks/api/search/useSearch";

export const useShowData = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("alphabetical");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { shows } = useGetAllShow(page, sort);
    const { query, setQuery, suggestions } = useSearch();

    const handleSort = (option: string) => {
        setSort(option);
        setIsDrawerOpen(false);
    };

    const handleShowClick = (id: number) => {
        navigate(`/dramas/${id}`);
    };

    return {
        page,
        sort,
        shows,
        query,
        suggestions,
        isDrawerOpen,
        setPage,
        setQuery,
        setIsDrawerOpen,
        handleSort,
        handleShowClick,
    };
};
