import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface Props {
    children?: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
    const { user } = useAuthStore();
    const location = useLocation();

    if (!user?.isAdmin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;
