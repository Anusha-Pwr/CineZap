import React, { useState } from "react";
import Select from "react-select";

import "./style.scss";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useFetch from "../../hooks/useFetch";
import { label } from "three/examples/jsm/nodes/Nodes.js";

const Explore = () => {
  const { mediaType } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const { data: genreData } = useFetch(`/genre/${mediaType}/list`);

  const sortByData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
  ];

  function changeHandler() {}

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
              isMulti
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
      </ContentWrapper>
    </div>
  );
};

export default Explore;
