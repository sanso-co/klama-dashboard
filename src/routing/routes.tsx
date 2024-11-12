import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import Home from "../pages/Home";
import Keywords from "../pages/Keywords";
import Tone from "../pages/Tone";
import Show from "../pages/Show";
import PeriodicCollection from "../pages/PeriodicCollection/PeriodicCollection";
import PeriodicDetails from "../pages/PeriodicDetails";
import PeriodicDetailsSub from "../pages/PeriodicDetailsSub";
import PermanentCollection from "@/pages/PermanentCollection/PermanentCollection";
import PermanentDetails from "../pages/PermanentDetails";
import ShowDetails from "@/pages/ShowDetails";
import Credit from "@/pages/Credit";
import Provider from "@/pages/Provider";
import AddShow from "@/pages/AddShow";
import TMDB from "@/pages/AddShow/TMDB";
import AddNew from "@/pages/AddShow/AddNew";
import Marketing from "@/pages/Marketing";
import Auth from "@/pages/Auth";
import AdminRoute from "./adminRoute";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Auth />,
    },
    {
        path: "/",
        element: (
            <AdminRoute>
                <Layout />
            </AdminRoute>
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/periodic-collection", element: <PeriodicCollection /> },
            { path: "/permanent-collection", element: <PermanentCollection /> },
            { path: "/periodic-collection/:id", element: <PeriodicDetails /> },
            {
                path: "/periodic-collection/:collectionId/sub/:listId",
                element: <PeriodicDetailsSub />,
            },
            { path: "/permanent-collection/:id", element: <PermanentDetails /> },
            { path: "/dramas/:id", element: <ShowDetails /> },
            { path: "/keywords", element: <Keywords /> },
            { path: "/tone", element: <Tone /> },
            { path: "/credit", element: <Credit /> },
            { path: "/provider", element: <Provider /> },
            { path: "/shows", element: <Show /> },
            { path: "/add", element: <AddShow /> },
            { path: "/add/new", element: <AddNew /> },
            { path: "/tmdb/:id", element: <TMDB /> },
            { path: "/marketing", element: <Marketing /> },
        ],
    },
]);

export default router;
