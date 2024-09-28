import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    disabled?: boolean;
}

export const Input = ({ name, label, disabled = false, ...rest }: InputProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <input id={name} {...register(name)} disabled={disabled} {...rest} />
        </div>
    );
};
