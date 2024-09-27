import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";

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

  async function fetchNextPageData() {
    const res = await fetchDataFromApi(`/search/multi`, {
      query,
      page,
    });

    if (data?.results) {
      setData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...res.results],
      }));
    } else {
      setData(res);
    }

    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    setPage(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      <div style={{ height: "100px" }}></div>
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={page <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return <MovieCard key={index} data={item} />;
                })}
              </InfiniteScroll>
            </>
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
