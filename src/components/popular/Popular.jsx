import React, { useState } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";
import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel/Carousel";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, loading } = useFetch(`/${endPoint}/popular`);

  function tabChangeHandler(tab) {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
          onTabChange={tabChangeHandler}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Popular;
