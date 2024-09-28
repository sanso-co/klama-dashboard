import styles from "./iconbutton.module.scss";

interface Props {
    label?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

export const IconButton = ({ label, children, disabled, onClick }: Props) => {
    return (
        <button className={styles.button} onClick={onClick} disabled={disabled}>
            {children}
            {label && <span>{label}</span>}
        </button>
    );
};
