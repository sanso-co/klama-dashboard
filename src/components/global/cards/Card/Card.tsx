import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Heading, Body } from "../../Typography";
import { ChevronRight } from "../../../../assets/Icons";
import { neutral } from "../../token";
import { ImageContainer } from "../../containers/ImageContainer";

import styles from "./card.module.scss";

interface Props {
    small?: boolean;
    children: ReactNode;
}

interface StringProps {
    title?: string;
    description?: string;
    children?: string;
    src?: string;
}

interface HeaderProps {
    title?: string;
}

interface OverlayProps {
    children: ReactNode;
    onClick?: () => void;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <div className="flex justify-between">
            <Heading variant="h3">{title}</Heading>
            <button className="trasnparent-button">
                <ChevronRight width={24} height={24} color="#afb8c1" />
            </button>
        </div>
    );
};

const Title = ({ title, description }: StringProps) => {
    return (
        <div>
            <Heading variant="h3">{title}</Heading>
            <Body variant="small">{description}</Body>
        </div>
    );
};

const Description = ({ children }: StringProps) => {
    return <Body>{children}</Body>;
};

const ViewMore = ({ children }: StringProps) => {
    return (
        <ViewMoreContainer>
            <Body>{children}</Body>
            <ChevronRight width={24} height={24} color={neutral[400]} stroke={2} />
        </ViewMoreContainer>
    );
};

const OverlayAction = ({ children, onClick }: OverlayProps) => {
    return (
        <button className={styles.overlaycontainer} onClick={onClick}>
            {children}
        </button>
    );
};

export const Card = ({ children }: Props) => {
    return <div className={styles.card}>{children}</div>;
};

const ViewMoreContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-top: 1px solid ${neutral[500]};
    padding: 1.5rem 0 0;
    margin-top: 0.75rem;

    p {
        font-weight: 500;
    }
`;

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Image = ImageContainer;
Card.ViewMore = ViewMore;
Card.OverlayAction = OverlayAction;
