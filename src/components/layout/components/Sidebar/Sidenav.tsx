import { Link, useNavigate } from "react-router-dom";
import { MENU } from "@/helper/constants/menu";

import styles from "./sidenav.module.scss";
import { useSearch } from "@/hooks/api/search/useSearch";

export const Sidenav = () => {
    const navigate = useNavigate();
    const { query, setQuery, suggestions } = useSearch();

    const handleShowClick = (id: number) => {
        navigate(`/dramas/${id}`);
        setQuery("");
    };

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <ul>
                    {MENU.map((item) => (
                        <li key={item.name} className={styles.item}>
                            <Link to={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search shows..."
                />
                {suggestions.length > 0 && (
                    <ul className={styles.suggestedList}>
                        {suggestions.map((drama) => (
                            <li
                                key={drama.id}
                                onClick={() => handleShowClick(drama.id)}
                                className={styles.suggestedItem}
                            >
                                {drama.name} ({drama.original_name})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
