import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./textinput.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    defaultValue?: string | number;
    variant?: "default" | "sm";
}

export const TextInput = ({
    label,
    name,
    variant = "default",
    register,
    defaultValue,
    ...inputParams
}: Props) => {
    return (
        <div className={styles.container}>
            {label && <label data-variant={variant}>{label}</label>}
            <input
                {...register(name)}
                defaultValue={defaultValue}
                data-variant={variant}
                {...inputParams}
            />
        </div>
    );
};
