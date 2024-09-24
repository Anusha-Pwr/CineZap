import React from "react";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./style.scss";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div className="details-container">
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <div
        style={{ height: "1000px", backgroundColor: "lightblue" }}
        className="test"
      ></div>
    </div>
  );
};

export default Details;
