import React from "react";
import "./style.scss";
import ReactPlayer from "react-player";

const VideoPopup = ({ id, show, onClose }) => {
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacity-layer" onClick={onClose}></div>
      <div className="videoPlayer">
        <span className="closeButton" onClick={onClose}>
          Close
        </span>
        <ReactPlayer
          height="100%"
          width="100%"
          url={`https://www.youtube.com/watch?v=${id}`}
          controls
        />
      </div>
    </div>
  );
};

export default VideoPopup;
