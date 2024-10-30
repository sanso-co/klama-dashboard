import { Link } from "react-router-dom";
import { useState } from "react";
import { MENU } from "@/helper/constants/menu";

import styles from "./header.module.scss";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className="logo">K:</div>
                <div className={styles.menu}>
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
