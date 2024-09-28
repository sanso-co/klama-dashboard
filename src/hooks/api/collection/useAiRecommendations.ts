import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { RecommendationsResponse } from "@/interfaces/recommendations";

export const useGetAiRecommendations = () => {
    const [show, setShow] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const sendPrompt = useCallback(
        async (userPrompt: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.getAiRecommendations(userPrompt);
                setShow(response);
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

    return { sendPrompt, show, isLoading, error };
};
