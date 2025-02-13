import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./radio.module.scss";

interface Props {
    label?: string;
    name: string;
    options: string[];
    defaultValue?: string;
    register: UseFormRegister<FieldValues>;
}

export const RadioInput: React.FC<Props> = ({ label, name, options, defaultValue, register }) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <div className={styles.options}>
                {options.map((option) => (
                    <div key={option} className={styles.option}>
                        <input
                            type="radio"
                            id={`${name}-${option}`}
                            value={option}
                            defaultChecked={defaultValue === option}
                            {...register(name)}
                        />
                        <label htmlFor={`${name}-${option}`}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
