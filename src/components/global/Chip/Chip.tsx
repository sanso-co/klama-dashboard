import { DismissIcon } from "@/assets/icons/DismissIcon";
import styles from "./chip.module.scss";

interface Props {
    label: string;
    imgSrc?: string;
    onRemove?: () => void;
}

export const Chip = ({ label, imgSrc, onRemove }: Props) => {
    return (
        <div data-image={Boolean(imgSrc)} className={styles.container}>
            {imgSrc && (
                <div className={styles.image}>
                    <img src={imgSrc} />
                </div>
            )}
            <span>{label}</span>
            <button className={styles.dismiss} onClick={onRemove}>
                <DismissIcon width={16} height={16} stroke={1.5} />
            </button>
        </div>
    );
};
