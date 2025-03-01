import styles from "./header.module.scss";

interface Props {
    title: string;
    primaryDescription?: string;
    secondaryDescription?: string;
    children?: React.ReactNode;
}

export const Header = ({ title, primaryDescription, secondaryDescription, children }: Props) => {
    return (
        <div className={styles.container}>
            <div>
                <h1>{title}</h1>
                {primaryDescription && <p className={styles.primary}>{primaryDescription}</p>}
                {secondaryDescription && <p className={styles.secondary}>{secondaryDescription}</p>}
            </div>
            <div>{children}</div>
        </div>
    );
};
