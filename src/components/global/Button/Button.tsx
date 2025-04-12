import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: string;
    size?: "sm";
    width?: string;
}

export const Button = ({ children, disabled, variant, size, width, onClick, ...rest }: Props) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
            data-variant={variant}
            data-size={size}
            data-width={width}
            {...rest}
        >
            {children}
        </button>
    );
};
