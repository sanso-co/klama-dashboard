import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
    variant?: "h1" | "h2" | "h3" | "big" | "small";
    strong?: boolean;
    className?: string;
    children?: string;
}

export const Heading = ({ variant, className, children }: Props) => {
    switch (variant) {
        case "h1":
            return <H1 className={className}>{children}</H1>;
        case "h2":
            return <H2 className={className}>{children}</H2>;
        case "h3":
            return <H3 className={className}>{children}</H3>;
        default:
            return <H1 className={className}>{children}</H1>;
    }
};

export const Body = ({ variant, strong, children }: Props) => {
    return (
        <P variant={variant} strong={strong}>
            {children}
        </P>
    );
};

const Base = css`
    font-family: "Inter", sans-serif;
`;

const H1 = styled.h1`
    ${Base};
    font-size: 1.75rem;
    font-weight: 500;
`;

const H2 = styled.h2`
    ${Base};
    font-size: 1.5rem;
    font-weight: 500;
`;

const H3 = styled.h3`
    ${Base};
    font-size: 1.125rem;
    font-weight: 600;
`;

const P = styled.p<Props>`
    ${Base};
    font-size: ${({ variant }) =>
        variant === "big" ? "1.125rem" : variant === "small" ? "0.875rem" : "1rem"};
    font-weight: ${({ strong }) => (strong ? "600" : "400")};
    line-height: ${({ variant }) => (variant === "small" ? "1.125rem" : "1.5rem")};
    color: #505866;
`;
