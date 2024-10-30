import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: string;
    width?: string;
}

export const Button = ({ label, disabled, variant, width, onClick, ...rest }: Props) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
            data-variant={variant}
            data-width={width}
            {...rest}
        >
            {label}
        </button>
    );
};
