import { getCroppedImageUrl, getKrImageUrl } from "@/services/image-url";
import { Card } from "./Card/Card";
import { ratio } from "../token";
import { DismissIcon } from "@/assets/icons/DismissIcon";

import styles from "./dramacard.module.scss";
import { LeanShowType } from "@/types/show";

interface Props {
    show: LeanShowType;
    showRemoveButton?: boolean;
    overlayclick?: () => void;
    titleClick?: () => void;
}

export const DramaCard = ({ show, showRemoveButton, overlayclick, titleClick }: Props) => {
    const getImageUrl = () => {
        if (show.poster_path?.US?.path ?? "" !== "") {
            return getCroppedImageUrl(show.poster_path.US.path);
        } else if (show.poster_path?.KR?.path ?? "" !== "") {
            return getKrImageUrl(show.poster_path.KR.path);
        } else {
            return "";
        }
    };

    return (
        <Card>
            <Card.OverlayAction onClick={overlayclick}>
                {showRemoveButton && (
                    <div className={styles.remove}>
                        <DismissIcon />
                    </div>
                )}
            </Card.OverlayAction>
            <Card.Image src={getImageUrl()} ratio={ratio.portrait_23} rounded="0.75rem" />
            <div className={styles.details} onClick={titleClick}>
                <p>{show.original_name}</p>
            </div>
        </Card>
    );
};
