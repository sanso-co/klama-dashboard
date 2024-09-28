import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { Show } from "@/interfaces/show";

export const useUpdateShow = (id: number) => {
    const [show, setShow] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const updateShow = useCallback(
        async (data: Partial<Show>) => {
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
    const [show, setShow] = useState<Show>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getShowDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const dramaDetails = await apiService.getShowDetails(id);

            setShow(dramaDetails);
            return dramaDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setShow, setIsLoading, setError]);

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
        async (show: Show) => {
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
