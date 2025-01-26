import { LoginResponseType } from "@/types/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StateProps {
    user: LoginResponseType | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: Error | null;
    setUser: (user: LoginResponseType) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setError: (error: Error | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<StateProps>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                accessToken: null,
                refreshToken: null,
                isLoading: false,
                error: null,
                setUser: (user) => set({ user }),
                setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
                setError: (error) => set({ error }),
                setIsLoading: (isLoading) => set({ isLoading }),
                logout: () => {
                    set({ user: null, accessToken: null, refreshToken: null });
                },
            }),
            {
                name: "auth",
            }
        )
    )
);
