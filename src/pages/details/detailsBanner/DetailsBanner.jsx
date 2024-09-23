import React from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Image from "../../../components/lazyLoadImage/Image";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import posterFallBack from "../../../assets/no-poster.png";
import { formatDate } from "../../../utils/dateUtils";

import "./style.scss";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayIcon } from "../PlayIcon";

const DetailsBanner = () => {
  const { mediaType, id } = useParams();

  const { loading, data } = useFetch(`/${mediaType}/${id}`);

  const url = useSelector((state) => state.home.url);

  const genres = data?.genres.map((entry) => entry.id);

  return (
    <div className="detailsBanner">
      {!loading ? (
        data && (
          <>
            <div className="backdrop-container">
              <div className="backdrop-img">
                <Image src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
            </div>

            <ContentWrapper>
              <div className="content">
                <div className="left">
                  {data.poster_path ? (
                    <Image
                      src={url.poster + data.poster_path}
                      alt=""
                      className="posterImg"
                    />
                  ) : (
                    <Image src={posterFallBack} alt="" className="posterImg" />
                  )}
                </div>

                <div className="right">
                  <div className="title">
                    {data.title || data.name} ({formatDate(data.release_date, 'year')})
                  </div>

                  <div className="subTitle">{data.tagline}</div>

                  <Genres data={genres} />

                  <div className="row">
                    <CircleRating rating={data.vote_average.toFixed(1)} />
                    <div className="playButton">
                      <PlayIcon />
                      <span className="text">Watch Trailer</span>
                    </div>
                  </div>

                  <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="description">{data.overview}</div>
                  </div>

                  <div className="info">
                    {data.status && (
                      <div className="infoItem">
                        <span>Status: </span>
                        <span>{data.status}</span>
                      </div>
                    )}
                    {data.release_date && (
                      <div className="infoItem">
                        <span>Release Date: </span>
                        <span>{formatDate(data.release_date, 'short-date')}</span>
                      </div>
                    )}
                    {data.runtime && (
                      <div className="infoItem">
                        <span>Runtime: </span>
                        <span>{data.runtime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ContentWrapper>
            <div style={{ height: "1000px" }}></div>
          </>
        )
      ) : (
        <div className="detailsBannerSkeleton"></div>
      )}
    </div>
  );
};

export default DetailsBanner;
