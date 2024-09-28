import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidenav } from "./components/Sidebar";

import styles from "./layout.module.scss";

export const Layout = () => {
    return (
        <>
            <Header />
            <div className={styles.main}>
                <Sidenav />
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
