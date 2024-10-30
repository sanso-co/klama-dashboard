import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

import { useGetAllShow } from "@/hooks/api/show/useShow";
import { useSearch } from "@/hooks/api/search/useSearch";

import { Header } from "@/components/global/Header";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { Pagination } from "@/components/global/Pagination";
import { Drawer } from "@/components/global/Drawer";
import { SortIcon } from "@/assets/icons/SortIcon";
import { CheckIcon } from "@/assets/icons/CheckIcon";

import { SORT } from "@/helper/constants/menu";

import styles from "./show.module.scss";

const Show = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("alphabetical");
    const { shows } = useGetAllShow(page, sort);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { query, setQuery, suggestions } = useSearch();

    const onItemClick = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleSort = (option: string) => {
        setSort(option);
        setIsDrawerOpen(false);
    };

    const handleShowClick = (id: number) => {
        navigate(`/dramas/${id}`);
    };

    return (
        <div className={styles.container}>
            <Helmet>
                <title>Shows</title>
            </Helmet>
            <Header title="Shows" description="Add show to the local list" />
            <div className={styles.list}>
                <div className={styles.subHeader}>
                    <div className={styles.subTop}>
                        <h2 className={styles.listHeader}>Show Total: {shows?.totalDocs}</h2>
                        <div className={styles.sort} onClick={onItemClick}>
                            <SortIcon width={20} height={20} />
                            {sort}
                        </div>
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search shows..."
                    />
                </div>
                {suggestions.length > 0 && (
                    <ul className={styles.suggestedList}>
                        {suggestions.map((drama) => (
                            <li
                                key={drama.id}
                                onClick={() => handleShowClick(drama.id)}
                                className={styles.suggestedItem}
                            >
                                <h3>
                                    {drama.name} ({drama.original_name})
                                </h3>
                            </li>
                        ))}
                    </ul>
                )}

                <ul className={styles.showList}>
                    {shows?.results?.map((show) => (
                        <div key={show.id}>
                            <Link to={`/dramas/${show.id}`}>
                                <DramaCard show={show} />
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
            <Pagination
                currentPage={page}
                totalPages={shows?.totalPages || 0}
                onPageChange={(page) => setPage(page)}
            />
            <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
                <ul className={styles.sortList}>
                    {SORT.map((item) => (
                        <li key={item.value} onClick={() => handleSort(item.value)}>
                            <span>{item.name}</span>
                            {sort === item.value && (
                                <CheckIcon stroke={1.5} width={18} height={18} />
                            )}
                        </li>
                    ))}
                </ul>
            </Drawer>
        </div>
    );
};

export default Show;
