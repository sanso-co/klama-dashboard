import { IconType } from "./IconType";

export const CheckmarkIcon = ({
    width = 24,
    height = 24,
    stroke = 1,
    color = "#000",
}: IconType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 12.2426L10.2426 16.4853L18.7279 8" />
        </svg>
    );
};
