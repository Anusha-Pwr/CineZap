import React from "react";
import { useRef } from "react";
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
import Genres from "../genres/Genres";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const Carousel = ({ data, loading, endPoint, title }) => {
  const url = useSelector((state) => state.home.url);
  const navigate = useNavigate();

  const carouselRef = useRef();

  function scrollHandler(direction) {
    const container = carouselRef.current;

    const scrollAmount =
      direction === "right"
        ? container.scrollLeft + (container.offsetWidth + 20)
        : container.scrollLeft - (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  function navigationHandler(item) {
    navigate(`/${item.media_type ?? endPoint}/${item.id}`);
  }

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
        {title && <div className="carouselTitle">{title}</div>}

        {!loading && data?.length > 0 && (
          <>
            <BsFillArrowLeftCircleFill
              className="carouselLeftNav arrow"
              onClick={() => scrollHandler("left")}
            />
            <BsFillArrowRightCircleFill
              className="carouselRightNav arrow"
              onClick={() => scrollHandler("right")}
            />
          </>
        )}

        {!loading ? (
          data?.length > 0 ? (
            <div className="carouselItems" ref={carouselRef}>
              {data?.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : posterFallBack;

                const date = new Date(item.release_date ?? item.first_air_date);

                return (
                  <div
                    key={item.id}
                    className="carouselItem"
                    onClick={() => navigationHandler(item)}
                  >
                    <div className="posterBlock">
                      <Image src={posterUrl} />
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                      <Genres data={item.genre_ids.slice(0, 2)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {item?.release_date === "" ||
                        item?.first_air_date === ""
                          ? "Date Unavailable"
                          : formatDate(
                              item?.release_date || item?.first_air_date,
                              "short-date"
                            )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="fallbackText">
              No {title} information available
            </span>
          )
        ) : (
          <div className="loadingSkeleton">
            {skeletonItemHandler()}
            {skeletonItemHandler()}
            {skeletonItemHandler()}
            {skeletonItemHandler()}
            {skeletonItemHandler()}
            {skeletonItemHandler()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
