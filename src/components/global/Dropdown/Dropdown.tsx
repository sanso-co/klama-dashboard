import React, { useEffect, useRef, useState } from "react";

import styles from "./dropdown.module.scss";

interface DropdownOptionType {
    name: string;
    value: string;
}

interface Props {
    positionX?: "left" | "right";
    selected: string;
    options: DropdownOptionType[];
    children: React.ReactNode;
    handleOptionSelect: (value: string) => void;
}

export const Dropdown = ({ selected, children, options, positionX, handleOptionSelect }: Props) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value: string) => {
        handleOptionSelect(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const optionStyle = {
        "--position-left": positionX === "left" && 0,
        "--position-right": positionX === "right" && 0,
    } as React.CSSProperties;

    return (
        <div ref={dropdownRef} className={styles.container}>
            <div onClick={handleTriggerClick}>{children}</div>
            {isOpen && (
                <div className={styles.options} style={optionStyle}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`${styles.option} ${
                                selected === option.value ? styles.selected : ""
                            }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
