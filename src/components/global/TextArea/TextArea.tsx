import { useFormContext } from "react-hook-form";

import styles from "./textarea.module.scss";

interface TextAreaProps {
    name: string;
    label: string;
}
export const TextArea = ({ name, label }: TextAreaProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...register(name)} rows={4} />
        </div>
    );
};
