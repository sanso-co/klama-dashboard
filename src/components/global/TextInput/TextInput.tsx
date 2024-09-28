import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./textinput.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    defaultValue?: string | number;
}

export const TextInput = ({ label, name, register, defaultValue, ...inputParams }: Props) => {
    return (
        <div className={styles.container}>
            {label && <label>{label}</label>}
            <input {...register(name)} defaultValue={defaultValue} {...inputParams} />
        </div>
    );
};
