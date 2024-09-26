import React from "react";
import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel/Carousel";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      data={data?.results}
      loading={loading}
      endPoint={mediaType}
      title={title}
    />
  );
};

export default Similar;
