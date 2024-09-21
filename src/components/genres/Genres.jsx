import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const genres = useSelector((state) => state.home.genres);

  return (
    <div className="genres">
      {data?.map((id) => {
        if (!genres[id]?.name) return;
        return <div className="genre">{genres[id]?.name}</div>;
      })}
    </div>
  );
};

export default Genres;
