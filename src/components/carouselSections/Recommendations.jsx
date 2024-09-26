import React from "react";
import Carousel from "../carousel/Carousel";
import useFetch from "../../hooks/useFetch";

const Recommendations = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <Carousel
      data={data?.results}
      loading={loading}
      endPoint={mediaType}
      title="Recommendations"
    />
  );
};

export default Recommendations;
