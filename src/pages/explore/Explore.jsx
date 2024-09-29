import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import "./style.scss";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";

const sortByData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
];

const Explore = () => {
  const { mediaType } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const [filters, setFilters] = useState({});

  const [reset, setReset] = useState(false);

  const { data: genreData } = useFetch(`/genre/${mediaType}/list`);

  async function fetchInitialData() {
    console.log(filters);
    const res = await fetchDataFromApi(`/discover/${mediaType}`, filters);
    setData(res);
    setLoading(false);
  }

  async function fetchNextPageData() {
    const res = await fetchDataFromApi(`/discover/${mediaType}`, {
      page: page + 1,
      ...filters,
    });

    console.log(res);

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
    // useEffect to reset all states when mediaType changes
    setFilters({});
    setData(null);
    setGenre(null);
    setSortBy(null);
    setPage(1);

    setReset(true);
  }, [mediaType]);

  useEffect(() => {
    // useEffect to call api with no filters set, when mediaType changes
    if (reset) {
      fetchInitialData();
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    // useEffect to fetch data from the first page when filters change
    setPage(1);
    fetchInitialData();
  }, [filters]);

  function changeHandler(selectedItems, action) {
    console.log(selectedItems);
    console.log(action);

    if (action.name === "sortBy") {
      setSortBy(selectedItems);

      if (action.action !== "clear") {
        console.log(selectedItems.value);
        setFilters((prev) => ({
          ...prev,
          sort_by: selectedItems.value,
        }));
      } else {
        setFilters((prev) => {
          const { sort_by, ...rest } = prev;
          return rest;
        });
      }
    }

    if (action.name === "genres") {
      console.log("hello");
      setGenre(selectedItems);

      if (action.action !== "clear") {
        let genreIds = selectedItems.map((entry) => entry.id);
        genreIds = JSON.stringify(genreIds).slice(1, -1);
        setFilters((prev) => ({
          ...prev,
          with_genres: genreIds,
        }));
      } else {
        setFilters((prev) => {
          const { with_genres, ...rest } = prev;
          return rest;
        });
      }
    }

    setPage(1);
  }

  console.log(filters);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genreData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={changeHandler}
              placeholder="Select genres"
              className="react-select-container genresSelect"
              classNamePrefix="react-select"
            />
            <Select
              name="sortBy"
              value={sortBy}
              closeMenuOnSelect={false}
              options={sortByData}
              onChange={changeHandler}
              isClearable={true}
              placeholder="Sort By"
              className="react-select-container sortBySelect"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {loading && <Spinner initial={true} />}

        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={page <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item?.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="fallbackText">Sorry, no results found.</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
