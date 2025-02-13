import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { useShowData } from "./hook/useShowData";

import { Header } from "@/components/global/Header";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { Pagination } from "@/components/global/Pagination";
import { Drawer } from "@/components/global/Drawer";
import { CheckIcon } from "@/assets/icons/CheckIcon";

import { SORT } from "@/helpers/constants/menu";

import styles from "./show.module.scss";
import { Sort } from "@/features/Shows/Sort";
import { sortOptions } from "@/helpers/constants/options";

const Show = () => {
    const { page, sort, shows, isDrawerOpen, setPage, setIsDrawerOpen, handleSort } = useShowData();

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
                        <Sort
                            options={sortOptions}
                            selected={sort}
                            onSortSelect={(option) => handleSort(option)}
                        />
                    </div>
                </div>
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
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
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
