import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Banner from '../../Component/Banner';
import SliderBanner from '../../Component/SliderBanner';
import Product from '../../Component/Product';
import { getCookieToken } from '../../shared/cookie';
import { __getProducts } from '../../redux/modules/product';

const Main = () => {
  const { isLoading, error, products } = useSelector((state) => state.products);
  console.log();
  const dispatch = useDispatch();

  const cookie = getCookieToken();

  if (cookie) {
    console.log('cookie');
  }

  useEffect(() => {
    dispatch(__getProducts());
    if (getCookieToken('user_token'));
  }, []);

  return (
    <Maincontainer>
      <Banner />
      <SliderBanner />
      <Product />
    </Maincontainer>
  );
};

export default Main;

const Maincontainer = styled.div`
  width: 100%;
  height: 100vh;
`;
