import { useSearch } from "@/hooks/api/search/useSearch";

import Search from "@/components/pages/collection/Search";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { LeanShowType } from "@/types/show";

import styles from "./add.module.scss";

interface Props {
    onSubmit: (showObjId: string) => void;
}

export const AddShow = ({ onSubmit }: Props) => {
    const { setQuery, suggestions } = useSearch();

    const onShowClick = (show: LeanShowType) => {
        onSubmit(show._id);
    };

    return (
        <div>
            <Search
                onSearch={(search) => {
                    setQuery(search);
                }}
            />
            <div className={styles.suggestions}>
                {suggestions.map((show) => (
                    <div
                        key={show.id}
                        onClick={() => onShowClick(show)}
                        className={styles.cardContainer}
                    >
                        <DramaCard show={show} />
                    </div>
                ))}
            </div>
        </div>
    );
};
