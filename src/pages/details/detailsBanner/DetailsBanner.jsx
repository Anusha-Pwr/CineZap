import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Image from "../../../components/lazyLoadImage/Image";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import posterFallBack from "../../../assets/no-poster.png";
import { formatDate } from "../../../utils/dateUtils";
import { toHoursMinutes } from "../../../utils/timeUtils";

import "./style.scss";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();

  const { loading, data } = useFetch(`/${mediaType}/${id}`);

  const url = useSelector((state) => state.home.url);

  const genres = data?.genres?.map((entry) => entry.id);

  const directors = crew?.filter((entry) => entry.job === "Director");

  const [showPopup, setShowPopup] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const writers = crew?.filter(
    (entry) =>
      entry.job === "Screenplay" ||
      entry.job === "Story" ||
      entry.job === "Writer"
  );

  function handleShowVideoPlayer() {
    setShowPopup(true);
    setVideoId(video.key);
  }

  function handleCloseVideoPlayer() {
    setShowPopup(false);
    setVideoId(null);
  }

  return (
    <div className="detailsBanner">
      {!loading ? (
        data && (
          <>
            <div className="backdrop-container">
              <div className="backdrop-img">
                <Image src={url.backdrop + data.backdrop_path} alt="Backdrop image" />
              </div>
              <div className="opacity-layer"></div>
            </div>

            <ContentWrapper>
              <div className="content">
                <div className="left">
                  {data.poster_path ? (
                    <Image
                      src={url.poster + data.poster_path}
                      alt="Poster image"
                      className="posterImg"
                    />
                  ) : (
                    <Image src={posterFallBack} alt="Dummy poster image" className="posterImg" />
                  )}
                </div>

                <div className="right">
                  <div className="title">
                    {data.title || data.name} (
                    {data.release_date === "" || data.first_air_date === ""
                      ? "Date Unavailable"
                      : formatDate(
                          data.release_date || data.first_air_date,
                          "year"
                        )}
                    )
                  </div>

                  <div className="subTitle">{data.tagline}</div>

                  <Genres data={genres} />

                  <div className="row">
                    <CircleRating rating={data?.vote_average?.toFixed(1)} />
                    <div className="playButton" onClick={handleShowVideoPlayer}>
                      <PlayIcon />
                      <span className="text">Watch Trailer</span>
                    </div>
                  </div>

                  <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="description">{data.overview}</div>
                  </div>

                  <div className="info">
                    {data?.status && (
                      <div className="infoItem">
                        <span className="text bold">Status: </span>
                        <span className="text">{data.status}</span>
                      </div>
                    )}

                    {(data.hasOwnProperty('release_date') || data.hasOwnProperty('first_air_date')) && (
                      <div className="infoItem">
                        <span className="text bold">Release Date: </span>
                        <span className="text">
                          {data.release_date === "" ||
                          data.first_air_date === ""
                            ? "Date Unavailable"
                            : formatDate(
                                data.release_date || data.first_air_date,
                                "short-date"
                              )}
                        </span>
                      </div>
                    )}

                    {data.hasOwnProperty('runtime') && (
                      <div className="infoItem">
                        <span className="text bold">Runtime: </span>
                        <span className="text">
                          {toHoursMinutes(data.runtime)}
                        </span>
                      </div>
                    )}
                  </div>

                  {directors?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Director: </span>
                      {directors.map((item, index) => (
                        <span className="text" key={index}>
                          {item.name} {index !== directors.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}

                  {writers?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Writer: </span>
                      {writers.map((item, index) => (
                        <span className="text" key={index}>
                          {item.name} {index !== writers.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}

                  {data?.created_by?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Creator: </span>
                      {data.created_by.map((item, index) => (
                        <span className="text" key={index}>
                          {item.name}{" "}
                          {index !== data.created_by.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <VideoPopup
                id={videoId}
                show={showPopup}
                onClose={handleCloseVideoPlayer}
              />
            </ContentWrapper>
          </>
        )
      ) : (
        <ContentWrapper>
          <div className="detailsBannerSkeleton">
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </div>
        </ContentWrapper>
      )}
    </div>
  );
};

export default DetailsBanner;
