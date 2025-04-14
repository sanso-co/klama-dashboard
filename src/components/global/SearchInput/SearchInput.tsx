import { ChangeEvent, InputHTMLAttributes } from "react";

import styles from "./searchinput.module.scss";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    name: string;
    label?: string;
    variant?: "default" | "sm";
    disabled?: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchInput = ({
    name,
    label,
    variant = "default",
    disabled = false,
    value,
    onChange,
    placeholder,
    ...rest
}: SearchInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={styles.container}>
            {label && (
                <label htmlFor={name} data-variant={variant}>
                    {label}
                </label>
            )}
            <input
                id={name}
                type="text"
                value={value}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                data-variant={variant}
                {...rest}
            />
        </div>
    );
};
