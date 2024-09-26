import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./style.scss";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const { query } = useParams();

  async function fetchInitialData() {
    setLoading(true);

    const res = await fetchDataFromApi(`/search/multi`, {
      query,
      page,
    });

    setData(res);
    setLoading(false);
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      <div style={{height: "100px"}}></div>
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <div className="pageTitle">
              {`Search ${
                data.total_results > 1 ? "results" : "result"
              } of '${query}'`}
            </div>
          ) : (
            <span className="fallbackText">
              Sorry, no results found for this search.
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
