import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending';
import "./style.scss";
import Popular from '../../components/popular/Popular';
import TopRated from '../../components/topRated/TopRated';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home