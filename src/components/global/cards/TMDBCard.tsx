import { getCroppedImageUrl } from "../../../services/image-url";
import { Card } from "./Card/Card";
import { Body } from "../Typography";
import { ratio } from "../token";
import { TMDBShowLean } from "@/types/tmdb";
import { DismissIcon } from "@/assets/icons/DismissIcon";

import styles from "./dramacard.module.scss";

interface Props {
    show: TMDBShowLean;
    showRemoveButton?: boolean;
    overlayclick?: () => void;
    titleClick?: () => void;
}

export const TMDBCard = ({ show, showRemoveButton, overlayclick, titleClick }: Props) => {
    return (
        <Card>
            <Card.OverlayAction onClick={overlayclick}>
                {showRemoveButton && (
                    <div className={styles.remove}>
                        <DismissIcon />
                    </div>
                )}
            </Card.OverlayAction>
            <Card.Image
                src={getCroppedImageUrl(show.poster_path)}
                ratio={ratio.portrait_23}
                rounded="0.75rem"
            />
            <div className={styles.details} onClick={titleClick}>
                <Body variant="small" strong>
                    {show.original_name}
                </Body>
            </div>
        </Card>
    );
};
