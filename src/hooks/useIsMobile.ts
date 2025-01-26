import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";

interface Props {
    breakpoint?: number;
    debounceTime?: number;
}

export const useIsMobile = (options: Props = {}) => {
    const { breakpoint = 768, debounceTime = 150 } = options;
    const [isMobile, setIsMobile] = useState(false);

    const checkIsMobile = useMemo(
        () =>
            debounce(() => {
                setIsMobile(window.innerWidth < breakpoint);
            }, debounceTime),
        [breakpoint, debounceTime]
    );

    useEffect(() => {
        setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", checkIsMobile);

        return () => {
            checkIsMobile.cancel();
            window.removeEventListener("resize", checkIsMobile);
        };
    }, [breakpoint, checkIsMobile]);

    return isMobile;
};
