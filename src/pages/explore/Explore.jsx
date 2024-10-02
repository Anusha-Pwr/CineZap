import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ScrollRestoration, useSearchParams } from "react-router-dom";

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
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "vote_count.desc", label: "Vote Count Descending" },
  { value: "vote_count.asc", label: "Vote Count Ascending" },
];

const Explore = () => {
  const initialRenderRef = useRef(true);

  const { mediaType } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [genre, setGenre] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const [filters, setFilters] = useState({});

  const [reset, setReset] = useState(false);

  const [resetOnBack, setResetOnBack] = useState(false);

  const { data: genreData } = useFetch(`/genre/${mediaType}/list`);

  async function fetchInitialData() {
    setLoading(true);
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
    const withGenres = searchParams.get("with_genres");
    const sortbyParam = searchParams.get("sort_by");
    console.log(withGenres);
    console.log(sortbyParam);

    if (!genreData?.genres) return;

    if (withGenres) {
      console.log("genre ids present");
      console.log(typeof withGenres);
      const genreIds = JSON.parse(`[${withGenres}]`);
      console.log(genreIds);
      const selectedGenres = genreData?.genres.filter((genre) =>
        genreIds.includes(genre.id)
      );
      console.log(selectedGenres);
      setGenre(selectedGenres || []);
      setFilters((prev) => ({ ...prev, with_genres: genreIds }));
      console.log(genre);
      // const selectedGenres = genreData?.genres.filter((genre) => genreIds.includes(genre.id));
      // console.log(selectedGenres);
      // setGenre(selectedGenres || []);
      // setFilters((prev) => ({ ...prev, with_genres: genreIds }));
    }

    if (sortbyParam) {
      console.log("sort by param present");
      console.log(sortbyParam);
      const selectedSort = sortByData.find(
        (option) => option.value === sortbyParam
      );
      if (selectedSort) {
        setSortBy(selectedSort);
        setFilters((prev) => ({ ...prev, sort_by: sortbyParam }));
      }
    }

    // fetchInitialData();
    setResetOnBack(true);
  }, [searchParams, genreData]);

  useEffect(() => {
    if (resetOnBack) {
      fetchInitialData();
      setResetOnBack(false);
    }
  }, [resetOnBack]);

  useEffect(() => {
    // useEffect to reset all states when mediaType changes
    if (initialRenderRef.current) {
      console.log("i am entered");
      initialRenderRef.current = false;
      console.log(initialRenderRef.current);
      return;
    }
    console.log("i am executed");
    console.log(initialRenderRef.current);
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

  // useEffect(() => {
  //   // useEffect to fetch data from the first page when filters change
  //   setPage(1);
  //   fetchInitialData();
  // }, [filters]);

  function updateSearchParams(newParams, clearParams = []) {
    console.log(newParams);
    const paramsObj = Object.fromEntries(searchParams.entries());

    clearParams.forEach((param) => delete paramsObj[param]);
    const meregedParams = { ...paramsObj, ...newParams };
    setSearchParams(meregedParams);
  }

  console.log(searchParams);

  function changeHandler(selectedItems, action) {
    console.log(selectedItems);
    console.log(action);

    if (action.name === "sortBy") {
      setSortBy(selectedItems);

      if (action.action !== "clear") {
        console.log(selectedItems.value);
        const newFilters = { ...filters, sort_by: selectedItems.value };
        setFilters(newFilters);

        // updateSearchParams(newFilters);
        updateSearchParams({ sort_by: selectedItems.value });
      } else {
        const { sort_by, ...rest } = filters;
        setFilters(rest);

        updateSearchParams(rest, ["sort_by"]);
      }
    }

    if (action.name === "genres") {
      console.log("hello");
      console.log(selectedItems);
      setGenre(selectedItems || []);

      if (action.action !== "clear") {
        let genreIds = selectedItems.map((entry) => entry.id);
        genreIds = JSON.stringify(genreIds).slice(1, -1);
        const newFilters = { ...filters, with_genres: genreIds };

        setFilters(newFilters);

        updateSearchParams({ with_genres: genreIds });
      } else {
        const { with_genres, ...rest } = filters;
        setFilters(rest);
        updateSearchParams(rest, ["with_genres"]);
      }
    }

    setPage(1);
  }

  console.log(filters);

  return (
    <>
      <ScrollRestoration />
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
                closeMenuOnSelect={true}
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

          {!loading && data && data?.results && (
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
                      <MovieCard
                        key={index}
                        data={item}
                        mediaType={mediaType}
                        filters={filters}
                        exploreData={data}
                        genre={genre}
                        sortBy={sortBy}
                        page={page}
                      />
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
    </>
  );
};

export default Explore;
