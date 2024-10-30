import { useCallback, useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { HeroType } from "@/interfaces/marketing";

export const useCreateHero = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createHero = useCallback(
        async (hero: HeroType) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.createHero(hero);
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

    return { createHero, isLoading, error };
};

export const useGetAllHero = () => {
    const [heroes, setHeroes] = useState<HeroType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getAllHeroes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedHeroes = await apiService.getAllHeroes();
            setHeroes(fetchedHeroes);
            return fetchedHeroes;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setHeroes, setIsLoading, setError]);

    useEffect(() => {
        getAllHeroes();
    }, [getAllHeroes]);

    return { heroes, refreshHeroes: getAllHeroes, isLoading, error };
};
