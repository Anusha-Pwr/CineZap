import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

function App() {
  useEffect(() => {
    async function apiTesting() {
      const res = await fetchDataFromApi("/movie/popular");
      console.log(res);
    }

    apiTesting();
  }, []);

  return <></>;
}

export default App;
