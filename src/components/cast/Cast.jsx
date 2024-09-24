import React from "react";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import posterFallBack from "../../assets/no-poster.png";
import Image from "../lazyLoadImage/Image";

const Cast = ({ data, loading }) => {
  const url = useSelector((state) => state.home.url);

  function skeleton() {
    return (
      <div className="skeletonItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  }

  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((entry) => {
              let imgUrl = entry.profile_path
                ? url.profile + entry.profile_path
                : posterFallBack;
              return (
                <div className="listItem">
                  <div className="profileImg">
                    <Image src={imgUrl} alt="" />
                  </div>
                  <div className="name">{entry.name}</div>
                  <div className="character">{entry.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
