import { Link, useLocation } from "react-router-dom";
import { MENU } from "@/helpers/constants/menu";

import styles from "./sidenav.module.scss";

export const Sidenav = () => {
    const location = useLocation();

    const isSelected = (itemUrl: string) => {
        if (itemUrl === "/shows") {
            return location?.pathname === "/shows" || location?.pathname.startsWith("/drama");
        }
        return location?.pathname === itemUrl;
    };

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <ul>
                    {MENU.map((item) => (
                        <li
                            key={item.name}
                            className={`${styles.item} ${
                                isSelected(item.url) ? styles.selected : ""
                            }`}
                        >
                            <Link to={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
