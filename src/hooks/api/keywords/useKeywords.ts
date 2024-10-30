import { useCallback, useEffect, useState } from "react";
import { useKeywordsStore } from "@/store/keywordsStore";
import { apiService } from "@/services/api";
import { KeywordType, KeywordsForShowType } from "@/interfaces/keyword";

export const useCreateKeyword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createKeyword = useCallback(
        async (keyword: Partial<KeywordType>) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.createKeyword(keyword);
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

    return { createKeyword, isLoading, error };
};

export const useGetAllKeywords = () => {
    const { setKeywords, setIsLoading, setError, isLoading, error, keywords } = useKeywordsStore();

    const getAllKeywords = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedKeywords = await apiService.getAllKeywords();
            setKeywords(fetchedKeywords);
            return fetchedKeywords;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setKeywords, setIsLoading, setError]);

    useEffect(() => {
        getAllKeywords();
    }, [getAllKeywords]);

    return { keywords, refreshKeywords: getAllKeywords, isLoading, error };
};

export const useUpdateKeyword = () => {
    const { setKeywordDetails, setIsLoading, setError, isLoading, error, keywordDetails } =
        useKeywordsStore();

    const updateKeyword = useCallback(
        async (data: KeywordType) => {
            if (!data) return;
            setIsLoading(true);
            setError(null);

            try {
                const updatedKeyword = await apiService.updateKeyword(data);
                setKeywordDetails(updatedKeyword);
                return updatedKeyword;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setKeywordDetails, setIsLoading, setError]
    );

    return { updateKeyword, isLoading, error, keywordDetails };
};

export const useAddShowToKeyword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addShowToKeyword = useCallback(
        async (id: string, showId: number) => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToKeyword({
                    id,
                    showId,
                });
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addShowToKeyword, isLoading, error };
};

export const useGetKeywordsForShow = (showId: number) => {
    const [keywords, setKeywords] = useState<KeywordsForShowType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getKeywordsForShow = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedKeywords = await apiService.getKeywordsForShow(showId);
            setKeywords(fetchedKeywords);
            return fetchedKeywords;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setKeywords, setIsLoading, setError]);

    useEffect(() => {
        getKeywordsForShow();
    }, [getKeywordsForShow]);

    return { keywords, refreshKeywords: getKeywordsForShow, isLoading, error };
};
