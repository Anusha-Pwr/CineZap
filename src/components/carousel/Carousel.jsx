import React from "react";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import posterFallBack from "../../assets/no-poster.png";

import Image from "../lazyLoadImage/Image";
import { useSelector } from "react-redux";
import CircleRating from "../circleRating/CircleRating";

const Carousel = ({ data, loading }) => {
  const url = useSelector((state) => state.home.url);

  function skeletonItemHandler() {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carouselItems">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : posterFallBack;

              const date = new Date(item.release_date);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div key={item.id} className="carouselItem">
                  <div className="posterBlock">
                    <Image src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">{formattedDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">{skeletonItemHandler()}</div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
