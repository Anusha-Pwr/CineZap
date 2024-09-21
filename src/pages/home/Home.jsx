import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending';
import "./style.scss";
import Popular from '../../components/popular/Popular';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <div style={{height: 1000}}></div>
    </div>
  )
}

export default Home