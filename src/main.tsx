import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";
import "./main.scss";
import { AuthWrapper } from "./features/Auth/AuthWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthWrapper>
        <RouterProvider router={router} />
    </AuthWrapper>
);
