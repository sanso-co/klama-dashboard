import { IconType } from "./IconType";

export const SortIcon = ({ width = 24, height = 24, stroke = 1.5, color = "#000" }: IconType) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 8L7 4M7 4L3 8M7 4L7 20"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 16L17 20M17 20L21 16M17 20L17 4"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
