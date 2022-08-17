import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import nikebanner from '../image/nikebanner.jpg';
import nikebanner2 from '../image/nikebanner2.jpg';

const SliderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <Bannerbox>
      <Slider {...settings}>
        <Bannerimage img={nikebanner2} />
        <Bannerimage img={nikebanner} />
      </Slider>
    </Bannerbox>
  );
};

export default SliderBanner;

const Bannerbox = styled.div`
  max-width: 1800px;
  height: 500px;
  margin: auto;
`;

const Bannerimage = styled.div`
  width: 100%;
  height: 500px;
  background: url(${(props) => props.img});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;
