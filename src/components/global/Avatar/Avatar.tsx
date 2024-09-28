import placeholder from "@/assets/icons/no-profile.svg";
import { CheckIcon } from "@/assets/icons/CheckIcon";
import styles from "./avatar.module.scss";

interface Props {
    url: string;
    disabled?: boolean;
    selected?: boolean;
}

export const Avatar = ({ url, disabled, selected }: Props) => {
    const noImage = url === "no-image";

    return (
        <div className={`${styles.container} ${disabled ? styles.disabled : ""}`}>
            {noImage ? (
                <img src={placeholder} alt="placeholder" className="placeholder" />
            ) : (
                <>
                    <img src={url} alt="" />
                    {selected && (
                        <div className={styles.checkContainer}>
                            <CheckIcon color="#fff" stroke={3} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
