import { useEffect, useState } from "react";

export const usePortal = (id: string): HTMLElement | null => {
    const [portal, setPortal] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.getElementById(id);
        if (element) setPortal(element);
    }, [id]);

    return portal;
};
