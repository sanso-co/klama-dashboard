import { useProviders } from "@/hooks/api/TMDB/useProviders";
import { useAddShowToProvider } from "@/hooks/api/provider/useProvider";

import { Button } from "@/components/global/Button";

import { TMDBProviderType } from "@/interfaces/tmdb";

import styles from "./provider.module.scss";

interface Props {
    showId: number;
}

const excludeProviders = [2100, 1796, 1968];

export const Provider = ({ showId }: Props) => {
    const { providers, isLoading, error } = useProviders(showId);

    const usData = providers?.results?.US?.flatrate || [];

    const filteredProviders = usData.filter(
        (provider: TMDBProviderType) => !excludeProviders.includes(provider.provider_id)
    );

    const { addShowToProvider } = useAddShowToProvider();

    const handleProviderAdd = async (provider: TMDBProviderType) => {
        try {
            await addShowToProvider(provider.provider_id, showId);
            alert("successfully added");
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div>Loading providers...</div>;
    if (error) return <div>Failed to load providers</div>;
    if (!filteredProviders || filteredProviders.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Providers</h3>
            </div>
            <div className={styles.list}>
                {filteredProviders.map((provider: TMDBProviderType) => {
                    const providerPath = provider.logo_path;
                    const providerName = provider.provider_name;

                    return (
                        <div key={provider.provider_id} className={styles.admin}>
                            <div className={styles.link}>
                                {providerPath ? (
                                    <img
                                        src={`https://media.themoviedb.org/t/p/original/${providerPath}`}
                                        alt=""
                                    />
                                ) : (
                                    <div className="footnote">Not available in the US yet</div>
                                )}
                                {providerName && <p>{providerName}</p>}
                            </div>
                            <Button label="Add" onClick={() => handleProviderAdd(provider)} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
