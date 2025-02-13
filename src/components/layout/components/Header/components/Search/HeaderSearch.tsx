import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIsMobile } from "@/hooks/useIsMobile";

import { SearchIcon } from "@/assets/icons/SearchIcon";
import { MobileSearch } from "@/features/Search/MobileSearch";

import styles from "./search.module.scss";
import { DesktopSearch } from "@/features/Search/DesktopSearch";

export const HeaderSearch = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleClick = (id: number) => {
        navigate(`/dramas/${id}`);
        setIsSearchOpen(false);
    };

    return (
        <>
            <div className={styles.search}>
                <button onClick={() => setIsSearchOpen(true)}>
                    <SearchIcon width={18} height={18} stroke={2} />
                    <span className={styles.label}>Search Drama...</span>
                </button>
            </div>
            {isSearchOpen &&
                (isMobile ? (
                    <MobileSearch
                        open={isSearchOpen}
                        handleClick={handleClick}
                        handleClose={() => setIsSearchOpen(false)}
                    />
                ) : (
                    <DesktopSearch
                        open={isSearchOpen}
                        handleClick={handleClick}
                        handleClose={() => setIsSearchOpen(false)}
                    />
                ))}
        </>
    );
};
