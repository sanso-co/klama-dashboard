import { LoginResponseType } from "@/interfaces/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StateProps {
    user: LoginResponseType | null;
    isLoading: boolean;
    error: Error | null;
    setUser: (user: LoginResponseType) => void;
    setError: (error: Error | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<StateProps>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isLoading: false,
                error: null,
                setUser: (user) => set({ user }),
                setError: (error) => set({ error }),
                setIsLoading: (isLoading) => set({ isLoading }),
                logout: () => {
                    set({ user: null });
                },
            }),
            {
                name: "auth",
            }
        )
    )
);
