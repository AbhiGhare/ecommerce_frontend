import React from 'react';
import Header from './Header';
import HeroArea from './HeroArea';
import TrendingProductArea from './TrendingProductArea';
import FeaturedCategories from './FeaturedCategories';
import Banner from './Banner';
import SpecialOffer from './SpecialOffer';

const HomePage = () => (
  <div>
    {/* <Header /> */}
    <HeroArea />
    <FeaturedCategories />
    <TrendingProductArea />
    <Banner />
    <SpecialOffer />
  </div>
);

export default HomePage;
