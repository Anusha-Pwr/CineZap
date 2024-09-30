import React from "react";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./style.scss";
import Cast from "../../components/cast/Cast";
import VideosSection from "../../components/videosSection/VideosSection";
import Similar from "../../components/carouselSections/Similar";
import Recommendations from "../../components/carouselSections/Recommendations";

import { useLocation } from "react-router-dom";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const location = useLocation();

  console.log(location.state);

  return (
    <div className="details-container">
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
