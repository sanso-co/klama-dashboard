import { DismissIcon } from "@/assets/icons/DismissIcon";
import styles from "./chip.module.scss";

interface Props {
    label: string;
    onRemove: () => void;
}

export const Chip = ({ label, onRemove }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.flex}>{label}</div>
            <button className={styles.dismiss} onClick={onRemove}>
                <DismissIcon width={16} height={16} />
            </button>
        </div>
    );
};
