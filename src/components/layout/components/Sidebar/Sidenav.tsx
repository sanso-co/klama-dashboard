import { Link } from "react-router-dom";
import { MENU } from "@/helper/constants/menu";

import styles from "./sidenav.module.scss";

export const Sidenav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                {MENU.map((item) => (
                    <li key={item.name} className={styles.item}>
                        <Link to={item.url}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
