import { useCallback, useEffect, useRef, useState } from "react";
import { apiService } from "@/services/api";
import { ShowType } from "@/types/show";

export const useUpdateShow = (id: number) => {
    const [show, setShow] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const updateShow = useCallback(
        async (data: Partial<ShowType>) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);

            try {
                const updatedShow = await apiService.updateShow(id, data);
                setShow(updatedShow);
                return updatedShow;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setShow, setIsLoading, setError]
    );

    return { updateShow, isLoading, error, show };
};

export const useGetShowDetails = (id: number) => {
    const [show, setShow] = useState<ShowType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const previousId = useRef(id);

    const getShowDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const dramaDetails = await apiService.getShowDetails(id);
            console.log(dramaDetails);
            setShow(dramaDetails);
            return dramaDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setShow, setIsLoading, setError, id]);

    useEffect(() => {
        // Check if id has changed (and it's not the initial render)
        if (previousId.current !== id && previousId.current !== undefined) {
            window.location.reload();
        }
        previousId.current = id;
    }, [id]);

    useEffect(() => {
        getShowDetails();
    }, [getShowDetails]);

    return { getShowDetails, isLoading, error, show };
};

export const useAddShow = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addShow = useCallback(
        async (show: Partial<ShowType>) => {
            if (!show) return;
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.addShow({
                    show,
                });
                setData(response);
                return response;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addShow, isLoading, error, data };
};

export const useAddNewShow = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addShow = useCallback(
        async (show: ShowType) => {
            if (!show) return;
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.addNewShow({
                    show,
                });
                setData(response);
                return response;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addShow, isLoading, error, data };
};
