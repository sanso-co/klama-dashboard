import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { ProfileType } from "@/types/profile";

export const useGetProfile = () => {
    const [profile, setProfile] = useState<ProfileType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedHeroes = await apiService.getProfile();
            setProfile(fetchedHeroes);
            return fetchedHeroes;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setProfile, setIsLoading, setError]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return { profile, refreshProfile: getProfile, isLoading, error };
};

export const useUpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateProfile = useCallback(
        async (data: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.updateProfile(data);
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

    return { updateProfile, isLoading, error };
};
