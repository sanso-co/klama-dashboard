import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidenav } from "./components/Sidebar";

import styles from "./layout.module.scss";

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Sidenav />
                <div className={styles.outlet}>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};
