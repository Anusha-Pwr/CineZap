import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { homeActions } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchApiConfig() {
      // function to get the configuration of images
      const res = await fetchDataFromApi("/configuration");
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(homeActions.getApiConfiguration(url));
    }

    fetchApiConfig();
    fetchGenres();
  }, []);

  async function fetchGenres() {
    // function to get genres for movies and tv shows
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((endPoint) =>
      promises.push(fetchDataFromApi(`/genre/${endPoint}/list`))
    );

    const data = await Promise.all(promises);
    console.log(data);

    data.forEach((genreObj) => {
      genreObj.genres.forEach((genre) => (allGenres[genre.id] = genre));
    });

    dispatch(homeActions.getGenres(allGenres));
  }

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
        {
          element: <PageNotFound />,
          path: "*",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
