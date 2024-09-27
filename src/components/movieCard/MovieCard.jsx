import React from "react";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import Image from "../lazyLoadImage/Image";
import { formatDate } from "../../utils/dateUtils";

import "./style.scss";
import { useSelector } from "react-redux";
import posterFallBack from "../../assets/no-poster.png";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ data }) => {
  const url = useSelector((state) => state.home.url);

  const posterUrl = data?.poster_path
    ? url.poster + data?.poster_path
    : posterFallBack;

  const navigate = useNavigate();

  function navigationHandler() {
    navigate(`/${data?.media_type}/${data?.id}`);
  }

  return (
    <div className="movieCard" onClick={navigationHandler}>
      <div className="posterBlock">
        <Image src={posterUrl} alt="" />
        <CircleRating rating={data?.vote_average?.toFixed(1)} />
        <Genres data={data?.genre_ids?.slice(0, 2)} />
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {data.release_date === "" || data.first_air_date === ""
            ? "Date Unavailable"
            : formatDate(data.release_date || data.first_air_date, "year")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
