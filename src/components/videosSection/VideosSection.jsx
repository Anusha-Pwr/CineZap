import React, { useState } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import VideoPopup from "../videoPopup/VideoPopup";
import Image from "../lazyLoadImage/Image";
import { PlayIcon } from "../../pages/details/PlayIcon";

import "./style.scss";

const VideosSection = ({ data, loading }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [videoId, setVideoId] = useState(null);

  function handleShowVideoPlayer(video) {
    setShowPopup(true);
    setVideoId(video.key);
  }

  function handleCloseVideoPlayer() {
    setShowPopup(false);
    setVideoId(null);
  }

  function loadingSkeleton() {
    return (
      <div className="skeletonItem">
        <div className="thumbnail skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  }

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          data?.length > 0 ? (
            <div className="videos">
              {data?.results?.map((video) => (
                <div
                  key={video.id}
                  className="videoItem"
                  onClick={() => handleShowVideoPlayer(video)}
                >
                  <div className="videoThumbnail">
                    <Image
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayIcon />
                  </div>
                  <div className="videoTitle">{video.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <span className="fallbackText">
              No Official Videos information available
            </span>
          )
        ) : (
          <div className="videosSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={showPopup}
        id={videoId}
        onClose={handleCloseVideoPlayer}
      />
    </div>
  );
};

export default VideosSection;
