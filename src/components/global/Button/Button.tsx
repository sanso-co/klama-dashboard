import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: string;
}

export const Button = ({ label, disabled, variant, onClick, ...rest }: Props) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
            data-variant={variant}
            {...rest}
        >
            {label}
        </button>
    );
};
