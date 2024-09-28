import { useSearch } from "@/hooks/api/search/useSearch";

import Search from "@/components/pages/collection/Search";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { LeanShowType } from "@/interfaces/show";

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
            <div>
                <Search
                    onSearch={(search) => {
                        setQuery(search);
                    }}
                />
                <div className="grid-cols-8">
                    {suggestions.map((show) => (
                        <div key={show.id} onClick={() => onShowClick(show)}>
                            <DramaCard show={show} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
