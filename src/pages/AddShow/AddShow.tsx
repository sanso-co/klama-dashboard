import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { useTMDBSearch } from "@/hooks/api/useTMDBSearch";

import Search from "@/components/pages/collection/Search";
import { TMDBCard } from "@/components/global/cards/TMDBCard";

import container from "@/assets/styles/container.module.scss";
import styles from "./add.module.scss";

const AddShow = () => {
    const { searchResults, setSearchTerm, isLoading, error } = useTMDBSearch();

    return (
        <div>
            <Helmet>
                <title>New Show</title>
            </Helmet>
            <Search
                placeholder="Search from TMDB"
                onSearch={(search) => {
                    setSearchTerm(search);
                }}
            />
            {isLoading && <div>Loading Search Results...</div>}
            {error && <div>Failed to load serach results</div>}
            {searchResults && (
                <div className={container.showList}>
                    {searchResults.results.map((show) => (
                        <div key={show.id}>
                            <Link to={`/tmdb/${show.id}`}>
                                <TMDBCard show={show} />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.add}>
                <Link to={`/add/new`}>Add new</Link>
            </div>
        </div>
    );
};

export default AddShow;
