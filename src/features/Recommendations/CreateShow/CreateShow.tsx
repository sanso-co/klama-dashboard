import { isAxiosError } from "axios";

import { useCreateShow } from "@/hooks/api/collection/useRecommendations";
import { useTMDBSearch } from "@/hooks/api/useTMDBSearch";

import Search from "@/components/pages/collection/Search";
import { DramaCard } from "@/components/global/cards/DramaCard";
import { TMDBShow } from "@/interfaces/search";
import { useNavigate } from "react-router-dom";

interface Props {
    closeModal: () => void;
}

export const CreateShow = ({ closeModal }: Props) => {
    const navigate = useNavigate();
    const { searchResults, isLoading, error, searchTerm, setSearchTerm, clearSearchTerm } =
        useTMDBSearch();

    const { createShow } = useCreateShow();

    const onShowSubmit = async (show: TMDBShow) => {
        const data = {
            id: show.id,
            details: {
                name: show.name,
                original_name: show.original_name || "",
                poster_path: show.poster_path,
            },
        };

        try {
            const response = await createShow(data);
            closeModal();
            clearSearchTerm();
            navigate(`/recommendations/${response._id}`);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                alert(error.response?.data?.message || "An error occurred");
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
            console.error("front error", error);
        }
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
                        <div key={show.id} onClick={() => onShowSubmit(show)}>
                            <DramaCard show={show} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
