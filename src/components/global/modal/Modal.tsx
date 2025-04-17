import { createPortal } from "react-dom";
import { useScrollLock } from "@/hooks/useScrollLock";
import { DismissIcon } from "@/assets/icons/DismissIcon";

import styles from "./modal.module.scss";

interface Props {
    open: boolean;
    header: string;
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    handleClose: () => void;
}

export const Modal = ({ open, header, size = "md", children, handleClose }: Props) => {
    useScrollLock(open);

    const mountElement = document.getElementById("portal-root");
    if (!mountElement) return null;

    const containerClassName = `${styles.container} ${styles[size]} ${open ? styles.open : ""}`;

    return createPortal(
        <>
            {open && (
                <div className={styles.wrapper}>
                    <div
                        className={`${styles.overlay} ${open ? styles.open : ""}`}
                        onClick={handleClose}
                    />
                    <div className={containerClassName}>
                        {header && (
                            <div className={styles.header}>
                                <h2>{header}</h2>
                                <button className={styles.closeButton} onClick={handleClose}>
                                    <DismissIcon width={21} height={21} />
                                </button>
                            </div>
                        )}
                        <div className={styles.content}>{children}</div>
                    </div>
                </div>
            )}
        </>,
        mountElement
    );
};
