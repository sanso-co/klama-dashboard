import { IconType } from "./IconType";

export const DismissIcon = ({ width = 24, height = 24, stroke = 1, color = "#000" }: IconType) => {
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
            <path d="M18 6 6 18M6 6l12 12" />
        </svg>
    );
};
