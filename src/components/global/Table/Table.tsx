import React, { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "./table.module.scss";

type CellValue = string | number | boolean | null | undefined;

interface TableData {
    [key: string]: CellValue;
}

interface Props<T extends TableData> {
    data: T[];
    columns: HeaderProps[];
    onRowClick?: (row: T) => void;
    className?: string;
}

export const Table = <T extends TableData>({
    data,
    columns,
    onRowClick,
    className = "",
}: Props<T>) => {
    const isMobile = useIsMobile();

    const TableHeader = () => (
        <div className={styles.header}>
            {columns.map((column, index) => {
                if (column.hidden) return null;

                const columnClass = `${styles.headerCell} ${styles[`colSpan${column.width}`]}`;

                return (
                    <div key={index} className={columnClass}>
                        <div>{column.header}</div>
                    </div>
                );
            })}
        </div>
    );

    const TableRow = ({ row }: { row: T }) => {
        if (isMobile) {
            return (
                <div className={styles.mobileRow}>
                    <div className={styles.mobileContent}>
                        {columns.map((column, index) => {
                            if (column.hidden) return null;

                            const value = row[column.key];
                            const label = column.header;

                            return (
                                <div key={index} className={styles.mobileField}>
                                    <div className={styles.mobileLabel}>{label}</div>
                                    <div className={styles.mobileValue}>{value}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.row} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map((column, index) => {
                    if (column.hidden) return null;

                    const value = row[column.key];
                    const cellClass = `${styles.cell} ${styles[`colSpan${column.width}`]}`;

                    return (
                        <div key={index} className={cellClass}>
                            {value}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`${styles.table} ${className}`}>
            {!isMobile && <TableHeader />}
            {data.map((row, index) => (
                <TableRow key={index} row={row} />
            ))}
        </div>
    );
};
