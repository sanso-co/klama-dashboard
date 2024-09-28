import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { useGetAllShow } from "@/hooks/api/show/useShow";
import { useSearch } from "@/hooks/api/search/useSearch";

import { Header } from "@/components/global/Header";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { Pagination } from "@/components/global/Pagination";

import styles from "./show.module.scss";

const Show = () => {
    const [page, setPage] = useState(1);
    const { shows } = useGetAllShow(page);

    const { query, setQuery, suggestions } = useSearch();

    const onSave = () => {
        console.log("saved");
    };
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Shows</title>
            </Helmet>
            <Header title="Shows" description="Add show to the local list" />
            <div className={styles.list}>
                <h2 className={styles.listHeader}>List of shows</h2>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search shows..."
                />
                {suggestions.length > 0 && (
                    <ul>
                        {suggestions.map((drama) => (
                            <li key={drama.id}>
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
        </div>
    );
};

export default Show;
