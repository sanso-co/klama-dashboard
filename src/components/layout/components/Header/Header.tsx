import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MENU } from "@/helpers/constants/menu";

import styles from "./header.module.scss";
import { User } from "./components/User";
import { HeaderSearch } from "./components/Search";

export const Header = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userRef = useRef<HTMLDivElement | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    const toggleFlyout = () => {
        setIsFlyoutOpen((prev) => !prev);
    };

    const closeFlyout = () => {
        setIsFlyoutOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userRef, isUserMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}></div>
                </div>
                <HeaderSearch />
                <div className={styles.avatarContainer}>
                    <User
                        isUserMenuOpen={isUserMenuOpen}
                        setIsUserMenuOpen={setIsUserMenuOpen}
                        userRef={userRef}
                    />
                    {/* <div className={`${styles.flyout} ${isFlyoutOpen ? styles.flyoutOpen : ""}`}>
                        <button onClick={closeFlyout}>Logout</button>
                    </div> */}
                </div>
                <div className={styles.hamburger}>
                    <button
                        className={`${styles.buttonElement} ${isOpen ? styles.open : ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                    ></button>
                </div>
            </div>
            <div className={`${styles.menuContent} ${isOpen ? styles.open : ""}`}>
                <nav>
                    <ul>
                        {MENU.map((item) => (
                            <li key={item.url}>
                                <Link to={item.url}>
                                    <span onClick={() => setIsOpen(!isOpen)}>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
