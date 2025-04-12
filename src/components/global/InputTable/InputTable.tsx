import { UseFormRegister } from "react-hook-form";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "../Button";

import styles from "./table.module.scss";

interface HeaderProps {
    key: string;
    label: string;
    width: number;
    type?: string;
    hidden?: boolean;
}

interface TableProps {
    [key: string]: any;
    id?: string | number;
    _id?: string;
}

interface Props<T extends TableProps> {
    columns: HeaderProps[];
    data: T[];
    register: UseFormRegister<any>;
    handleClick: (item: T) => void;
}

export const InputTable = <T extends TableProps>({
    columns,
    data,
    register,
    handleClick,
}: Props<T>) => {
    const TableHeader = () => (
        <div className={styles.header}>
            {columns.map((column, index) => {
                if (column.hidden) return null;

                const headerClass = `${styles.headerCell} ${styles[`colSpan${column.width}`]}`;

                return (
                    <div key={index} className={headerClass}>
                        <div>{column.label}</div>
                    </div>
                );
            })}
        </div>
    );

    const TableRow = ({ item }: { item: T }) => (
        <div className={styles.row}>
            {columns.map((column, index) => {
                if (column.hidden) return null;

                const value = item[column.key];
                const cellClass = `${styles.cell} ${styles[`colSpan${column.width}`]}`;

                if (column.type === "input")
                    return (
                        <div key={index} className={cellClass}>
                            <TextInput
                                name={item.id!.toString()}
                                register={register}
                                defaultValue={value}
                            />
                        </div>
                    );

                if (column.type === "button")
                    return (
                        <div key={index} className={cellClass}>
                            <Button size="sm" onClick={() => handleClick(item)}>
                                Update
                            </Button>
                        </div>
                    );

                return (
                    <div key={index} className={cellClass}>
                        {value}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div>
            <TableHeader />
            {data.map((row, index) => (
                <TableRow key={index} item={row} />
            ))}
        </div>
    );
};
