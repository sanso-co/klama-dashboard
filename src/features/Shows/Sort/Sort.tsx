import { useState } from "react";

import { SortEnum } from "@/helpers/constants/options";
import { OptionType, SortType } from "@/types/sort";

import { Dropdown } from "@/components/global/Dropdown";
import { NewModal } from "@/components/global/NewModal";
import { SortIcon } from "@/assets/icons/SortIcon";
import { CheckmarkIcon } from "@/assets/icons/CheckmarkIcon";

import styles from "./sort.module.scss";

interface ButtonProps {
    onClick?: () => void;
}

const SortButton = ({ onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className={styles.sortButton}>
            <SortIcon width={20} height={20} stroke={1.5} />
            <span>Sort</span>
        </button>
    );
};

interface Props {
    selected: SortType;
    options: OptionType[];
    onSortSelect: (value: SortType) => void;
}

export const Sort = ({ selected, options, onSortSelect }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const handleSortSelect = (value: SortType) => {
        if (value === SortEnum.NameAsc) {
            onSortSelect(SortEnum.NameAsc);
        } else {
            onSortSelect(value);
        }
        setShowModal(false);
    };

    return (
        <>
            <div className={styles.desktop}>
                <Dropdown
                    selected={selected}
                    options={options}
                    positionX="right"
                    handleOptionSelect={(value) => handleSortSelect(value as SortType)}
                >
                    <SortButton />
                </Dropdown>
            </div>
            <div className={styles.mobile}>
                <SortButton onClick={() => setShowModal!(true)} />
                <NewModal
                    header="Sort by"
                    open={showModal}
                    handleClose={() => {
                        setShowModal!(false);
                    }}
                >
                    <ul className={styles.options}>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`${styles.option} ${
                                    selected === option.value ? styles.selected : ""
                                }`}
                                onClick={() => handleSortSelect(option.value)}
                            >
                                <span>{option.name}</span>
                                {selected === option.value && <CheckmarkIcon stroke={1.5} />}
                            </li>
                        ))}
                    </ul>
                </NewModal>
            </div>
        </>
    );
};
