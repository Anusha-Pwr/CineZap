import React, { useState } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";
import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel/Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endPoint}`);

  function tabChangeHandler(tab) {
    setEndPoint(tab === "Day" ? "day" : "week");
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={tabChangeHandler} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
