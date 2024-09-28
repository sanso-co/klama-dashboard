import { useState } from "react";

import Search from "@/components/pages/collection/Search";
import { useTMDBSearch } from "@/hooks/api/useTMDBSearch";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { TMDBShow } from "@/interfaces/search";

interface Props {
    onSubmit: (data: any) => void;
}

export const AddShow = ({ onSubmit }: Props) => {
    const { searchResults, isLoading, error, searchTerm, setSearchTerm } = useTMDBSearch();

    const onShowClick = (show: TMDBShow) => {
        onSubmit(show);
    };

    return (
        <div>
            <div>
                <Search
                    onSearch={(search) => {
                        setSearchTerm(search);
                    }}
                />
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                <div className="grid-cols-8">
                    {searchResults.results.map((show) => (
                        <div key={show.id} onClick={() => onShowClick(show)}>
                            <DramaCard show={show} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
