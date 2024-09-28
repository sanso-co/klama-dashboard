import styles from "./header.module.scss";

interface Props {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export const Header = ({ title, description, children }: Props) => {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {children && <div className={styles.children}>{children}</div>}
        </div>
    );
};
