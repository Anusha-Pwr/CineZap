import React from "react";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import profileFallBack from "../../assets/avatar.png";
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
          data?.length > 0 ? (
            <div className="listItems">
              {data?.map((entry, index) => {
                let imgUrl = entry.profile_path
                  ? url.profile + entry.profile_path
                  : profileFallBack;
                return (
                  <div className="listItem" key={index}>
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
            <span className="fallbackText">No cast informaton available</span>
          )
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
