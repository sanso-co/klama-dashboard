import { IconType } from "./IconType";

export const PlusIcon = ({ width = 24, height = 24, stroke = 1, color = "#000" }: IconType) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6L12 18M18 12L6 12" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
        </svg>
    );
};
