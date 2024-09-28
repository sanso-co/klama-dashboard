import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import Home from "../pages/Home";
import Keywords from "../pages/Keywords";
import Show from "../pages/Show";
import PeriodicCollection from "../pages/PeriodicCollection/PeriodicCollection";
import PeriodicCollectionDetails from "../pages/PeriodicDetails";
import PermanentCollection from "@/pages/PermanentCollection/PermanentCollection";
import PermanentCollectionDetails from "../pages/PermanentDetails";
import ShowDetails from "@/pages/ShowDetails";
import RecommendationsDetails from "../pages/RecommendationsDetails";
import ProviderCollection from "@/pages/ProviderCollection";
import Credit from "@/pages/Credit";
import TMDB from "@/pages/TMDB";
import TMDBDetails from "@/pages/TMDB/TMDBDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/periodic-collection", element: <PeriodicCollection /> },
            { path: "/permanent-collection", element: <PermanentCollection /> },
            { path: "/provider-collection", element: <ProviderCollection /> },
            { path: "/periodic-collection/:id", element: <PeriodicCollectionDetails /> },
            { path: "/permanent-collection/:id", element: <PermanentCollectionDetails /> },
            { path: "/dramas/:id", element: <ShowDetails /> },
            { path: "/recommendations/:id", element: <RecommendationsDetails /> },
            { path: "/keywords", element: <Keywords /> },
            { path: "/credit", element: <Credit /> },
            { path: "/shows", element: <Show /> },
            { path: "/tmdb", element: <TMDB /> },
            { path: "/tmdb/:id", element: <TMDBDetails /> },
        ],
    },
]);

export default router;
