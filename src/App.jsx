import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";

function App() {
  useEffect(() => {
    async function apiTesting() {
      const res = await fetchDataFromApi("/movie/popular");
      console.log(res);
    }

    apiTesting();
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
