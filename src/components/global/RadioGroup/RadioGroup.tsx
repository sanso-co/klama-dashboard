import styles from "./radiogroup.module.scss";

interface RadioOption {
    label: string;
    value: string;
}

interface Props {
    options: RadioOption[];
    onChange: (selectedValue: string) => void;
    value: string;
    name: string;
}

export const RadioGroup = ({ options, onChange, value, name }: Props) => {
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.group}>
            {options.map((option) => (
                <label key={option.value} className={styles.label}>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={handleRadioChange}
                        className="radio-input"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};
