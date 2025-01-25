import { useCallback } from "react";
import { apiService } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
    const { setUser, setError, setIsLoading } = useAuthStore();

    const loginAdmin = useCallback(
        async (username: string, password: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const userData = await apiService.login({
                    username,
                    password,
                });
                setUser(userData);
                return userData;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError, setUser]
    );

    return { loginAdmin };
};
