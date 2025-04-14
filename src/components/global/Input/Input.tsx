import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    variant?: "default" | "sm";
    disabled?: boolean;
}

export const Input = ({
    name,
    label,
    variant = "default",
    disabled = false,
    ...rest
}: InputProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.container}>
            <label htmlFor={name} data-variant={variant}>
                {label}
            </label>
            <input
                id={name}
                {...register(name)}
                disabled={disabled}
                data-variant={variant}
                {...rest}
            />
        </div>
    );
};
