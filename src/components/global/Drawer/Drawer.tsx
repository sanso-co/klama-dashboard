import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePortal } from "@/hooks/usePortal";
import { DismissIcon } from "@/assets/icons/DismissIcon";
import styles from "./drawer.module.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Drawer = ({ isOpen, onClose, children }: Props) => {
    const [isRendered, setIsRendered] = useState(false);
    const portal = usePortal("portal-root");

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
        } else {
            const timer = setTimeout(() => setIsRendered(false), 300); // 300ms는 transition 시간과 일치
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!portal) return null;

    const drawerContent = (
        <>
            {(isOpen || isRendered) && (
                <div
                    className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
                    onClick={onClose}
                ></div>
            )}
            <div className={`${styles.modal} ${isOpen ? styles.modalOpen : styles.modalClosed}`}>
                <div className={styles.modalHeader}>
                    <button onClick={onClose} className={styles.closeButton}>
                        <DismissIcon />
                    </button>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.modalContent}>{children}</div>
                </div>
            </div>
        </>
    );

    return ReactDOM.createPortal(drawerContent, portal);
};
