import { useTMDBCast } from "@/hooks/api/cast/useTMDBCast";
import { Avatar } from "@/components/global/Avatar";
import { getProfileImage } from "@/services/image-url";

import { useAddAdditionalCasts } from "@/hooks/api/cast/useCast";

import styles from "./addcast.module.scss";
import { useState } from "react";
import { CastType } from "@/interfaces/tmdb";
import { Cast } from "@/interfaces/cast";
import { Button } from "@/components/global/Button";

interface Props {
    showId: number;
    existingCasts: Cast[];
}

export const AddCast = ({ showId, existingCasts }: Props) => {
    const { cast, isLoading, error } = useTMDBCast(showId);
    const [additionalCast, setAdditionalCast] = useState<CastType[]>([]);

    const onShowClick = (castMember: CastType) => {
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
        const updatedMainCast: Cast[] = additionalCast?.map((cast) => {
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
