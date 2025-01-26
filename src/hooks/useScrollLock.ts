import { useEffect } from "react";

export const useScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (!isLocked) {
            html.removeAttribute("data-scroll-locked");
            body.removeAttribute("data-scroll-locked");
            return;
        }

        html.setAttribute("data-scroll-locked", "");
        body.setAttribute("data-scroll-locked", "");

        return () => {
            html.removeAttribute("data-scroll-locked");
            body.removeAttribute("data-scroll-locked");
        };
    }, [isLocked]);
};
