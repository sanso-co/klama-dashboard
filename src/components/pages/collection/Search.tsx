import { useEffect, useRef } from "react";
import { SearchIcon } from "../../../assets/Icons";

import styles from "./search.module.scss";

interface Props {
    onSearch: (searchTerm: string) => void;
}

const Search = ({ onSearch }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current) {
            onSearch(inputRef.current.value);
            inputRef.current.value = "";
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSearchSubmit}>
                <SearchIcon width={20} height={20} color="#000" stroke={2} />
                <input ref={inputRef} placeholder="Search Shows" className={styles.input} />
            </form>
        </div>
    );
};

export default Search;
