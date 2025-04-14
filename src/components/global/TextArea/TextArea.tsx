import { useFormContext } from "react-hook-form";

import styles from "./textarea.module.scss";

interface TextAreaProps {
    name: string;
    label: string;
    variant?: "default" | "sm";
}
export const TextArea = ({ name, label, variant = "default" }: TextAreaProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.container}>
            <label htmlFor={name} data-variant={variant}>
                {label}
            </label>
            <textarea id={name} {...register(name)} rows={4} data-variant={variant} />
        </div>
    );
};
