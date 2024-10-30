import { useEffect } from "react";
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
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    const containerClassName = `${styles.container} ${size ? styles[size] : ""}`;

    return (
        <>
            <div className={styles.overlay} onClick={handleClose} />
            <div className={containerClassName}>
                <div className={styles.header}>
                    <h1>{header}</h1>
                    <button className={styles.button} onClick={handleClose}>
                        <DismissIcon width={16} height={16} />
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    );
};
