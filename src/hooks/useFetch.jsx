import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchRequest() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchDataFromApi(url);
        setData(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequest();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
