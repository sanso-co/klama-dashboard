import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { useGetShowDetails } from "@/hooks/api/drama/useShow";

import { Header } from "@/components/global/Header";
import { Info } from "@/features/Drama/Info";
import { OriginalWork } from "@/features/Drama/Original";
import { Genres } from "@/features/Drama/Genres";
import { Keywords } from "@/features/Drama/Keywords";
import { Tone } from "@/features/Drama/Tone";
import { Provider } from "@/features/Drama/Provider";
import { Credits } from "@/features/Drama/Credit";
import { DraggableCast } from "@/features/Drama/DraggableCast";
import { Recommendations } from "@/features/Drama/Recommendations";
import { Similar } from "@/features/Drama/Similar";

const ShowDetails = () => {
    const { id } = useParams();
    const { show, error } = useGetShowDetails(Number(id));

    if (!show) return <div>Loading drama details...</div>;
    if (error) return <div>Failed to load drama detils</div>;

    return (
        <div>
            <Helmet>
                <title>{show.original_name}</title>
            </Helmet>
            <Header title={show.original_name || ""} secondaryDescription={show.id.toString()} />
            <Info id={Number(id)} show={show} />
            <OriginalWork id={Number(id)} />
            <Genres id={Number(id)} genres={show?.genres} />
            <Keywords showId={Number(id)} keywords={show?.keywords} />
            <Tone showId={Number(id)} tones={show?.tones} />
            <Provider showId={Number(id)} />
            <Credits showId={Number(id)} />
            <DraggableCast showId={Number(id)} />
            <Recommendations showId={Number(id)} />
            <Similar showId={Number(id)} />
        </div>
    );
};

export default ShowDetails;
