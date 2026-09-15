import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "../features/home/Home";
import UserProfile from "../features/github/UserProfile";
import Compare from "../features/github/Compare";
import CountryDetail from "../features/countries/CountryDetail";
import Favorites from "../features/favorites/Favorites";
import NotFound from "../shared/components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "user/:username", element: <UserProfile /> },
      { path: "country/:code", element: <CountryDetail /> },
      { path: "compare", element: <Compare /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);