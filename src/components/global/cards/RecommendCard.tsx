import { getCroppedImageUrl } from "../../../services/image-url";
import { Card } from "./Card";
import { Body } from "../Typography";
import { ratio } from "../token";
import { RecommendationsResponse } from "@/interfaces/recommendations";
import { DismissIcon } from "@/assets/icons/DismissIcon";

import styles from "./dramacard.module.scss";

interface Props {
    show: RecommendationsResponse;
    showRemoveButton?: boolean;
    overlayclick?: () => void;
    titleClick?: () => void;
}

export const RecommendCard = ({ show, showRemoveButton, overlayclick, titleClick }: Props) => {
    return (
        <Card col>
            <Card.OverlayAction onClick={overlayclick}>
                {showRemoveButton && (
                    <div className={styles.remove}>
                        <DismissIcon />
                    </div>
                )}
            </Card.OverlayAction>
            <Card.Image
                src={getCroppedImageUrl(show.details.poster_path)}
                ratio={ratio.portrait_23}
                rounded="0.75rem"
            />
            <div className={styles.details} onClick={titleClick}>
                <Body variant="small" strong>
                    {show.details.original_name}
                </Body>
            </div>
        </Card>
    );
};
