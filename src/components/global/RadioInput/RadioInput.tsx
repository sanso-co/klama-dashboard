import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./radio.module.scss";

interface Props {
    groupLabel?: string;
    name: string;
    options: string[];
    defaultValue?: string;
    helperText?: string;
    size?: "default" | "sm";
    register: UseFormRegister<FieldValues>;
}

export const RadioInput: React.FC<Props> = ({
    groupLabel,
    name,
    options,
    defaultValue,
    helperText,
    size = "default",
    register,
}) => {
    return (
        <div className={styles.container}>
            {groupLabel && (
                <div data-size={size} className={styles.groupLabel}>
                    {groupLabel}
                </div>
            )}
            <div className={styles.options}>
                {options.map((option) => (
                    <label key={option} htmlFor={`${name}-${option}`} className={styles.option}>
                        <input
                            type="radio"
                            id={`${name}-${option}`}
                            value={option}
                            defaultChecked={defaultValue === option}
                            {...register(name)}
                            className={styles.radioInput}
                        />
                        <span className={styles.customRadio}></span>
                        <span data-size={size} className={styles.optionLabel}>
                            {option}
                        </span>
                    </label>
                ))}
            </div>
            {helperText && <div className={styles.helperText}>{helperText}</div>}
        </div>
    );
};
