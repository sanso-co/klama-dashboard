import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { useGetShowDetails } from "@/hooks/api/drama/useShow";

import { Header } from "@/components/global/Header";
import { Genres } from "@/features/Drama/Genres";
import { Keywords } from "@/features/Drama/Keywords";
import { Info } from "@/features/Drama/Info";
import { Credits } from "@/features/Drama/Credit";
import { Original } from "@/features/Drama/Original";
import { Recommendations } from "@/features/Drama/Recommendations";
import { DraggableCast } from "@/features/Drama/DraggableCast";

const ShowDetails = () => {
    const { id } = useParams();
    const { show, error } = useGetShowDetails(Number(id));

    if (!show) return <div>Loading drama details...</div>;
    if (error) return <div>Failed to load drama detils</div>;
    console.log(show);
    return (
        <div>
            <Helmet>
                <title>{show.original_name}</title>
            </Helmet>
            <Header title={show.original_name || ""} description={show.id.toString()} />
            <Info id={Number(id)} drama={show} />
            <Original id={Number(id)} show={show} />
            <Genres id={Number(id)} genres={show?.genres} />
            <Keywords showId={Number(id)} />
            <Credits showId={Number(id)} />
            <DraggableCast showId={Number(id)} />
            <Recommendations showId={Number(id)} />
        </div>
    );
};

export default ShowDetails;
