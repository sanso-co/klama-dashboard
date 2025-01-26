import { useState } from "react";

import { getProfileImage } from "@/services/image-url";
import { formatShowId } from "@/helpers/showId";

import { useTMDBCast } from "@/hooks/api/cast/useTMDBCast";
import { useAddAdditionalCasts } from "@/hooks/api/cast/useCast";

import { Avatar } from "@/components/global/Avatar";
import { Button } from "@/components/global/Button";

import { TMDBCastType } from "@/types/tmdb";
import { CastType } from "@/types/cast";

import styles from "./addcast.module.scss";

interface Props {
    showId: number;
    existingCasts: CastType[];
}

export const AddCast = ({ showId, existingCasts }: Props) => {
    const formattedId = formatShowId(showId);
    // const formattedId = showId;
    const { cast, isLoading, error } = useTMDBCast(formattedId);
    const [additionalCast, setAdditionalCast] = useState<TMDBCastType[]>([]);

    const onShowClick = (castMember: TMDBCastType) => {
        if (isCastSelected(castMember.id)) {
            setAdditionalCast((prev) => prev.filter((existing) => existing.id !== castMember.id));
        } else if (!isCastInExistingCasts(castMember.id)) {
            setAdditionalCast((prev) => [...prev, castMember]);
        }
    };

    const isCastInExistingCasts = (id: number) => {
        return existingCasts?.some((existingCast) => existingCast.id === id);
    };

    const isCastSelected = (id: number) => {
        return additionalCast.some((cast) => cast.id === id);
    };

    const { addAddtionalCasts } = useAddAdditionalCasts();

    const hanldeAdditionalCastsSubmit = async () => {
        const updatedMainCast: CastType[] = additionalCast?.map((cast) => {
            return {
                id: cast.id,
                name: cast.name,
                original_name: cast.original_name,
                profile_path: cast.profile_path,
                known_for_department: cast.known_for_department,
                role: cast.roles[0].character,
                original_role: "",
                order: cast.order,
            };
        });

        try {
            await addAddtionalCasts(showId, updatedMainCast);
            alert("successfully added");
        } catch (error) {
            console.error(error);

            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };

                alert(axiosError.response?.data?.message || "An error occurred");
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    if (isLoading) return <div>Loading casts...</div>;
    if (error) return <div>Failed to load casts</div>;
    if (!cast || cast.length === 0) return null;

    return (
        <div>
            <Button label="Add Additional Casts" onClick={hanldeAdditionalCastsSubmit} />
            <div className={styles.casts}>
                {cast.map((item) => (
                    <div key={item.id} onClick={() => onShowClick(item)} className={styles.item}>
                        <Avatar
                            url={getProfileImage(item.profile_path)}
                            disabled={isCastInExistingCasts(item.id)}
                            selected={isCastSelected(item.id)}
                        />
                        <div className={styles.role}>
                            <p>{item.roles[0].character}</p>
                            <p>{item.original_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
