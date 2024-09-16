import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { homeActions } from "./store/homeSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchApiConfig() {
      const res = await fetchDataFromApi("/configuration");
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }

      dispatch(homeActions.getApiConfiguration(url));
    }

    fetchApiConfig();
  }, []);

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          element: <Home />,
          path: "/",
        },
        {
          element: <Details />,
          path: "/:mediaType/:id",
        },
        {
          element: <SearchResult />,
          path: "/search/:query",
        },
        {
          element: <Explore />,
          path: "/explore/:mediaType",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
