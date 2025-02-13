import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

interface Props {
    children: React.ReactNode;
}

export const AuthWrapper = ({ children }: Props) => {
    const { accessToken, refreshToken } = useAuthStore();
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        const validateInitialToken = async () => {
            if (!accessToken && !refreshToken) {
                setIsValidating(false);
                return;
            }

            try {
                await apiService.validateToken();
            } catch (error) {
                // interceptor will handle refresh/logout if needed
            } finally {
                setIsValidating(false);
            }
        };

        validateInitialToken();
    }, []);

    if (isValidating) {
        return <div>Loading...</div>;
    }

    return children;
};
