import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Banner from '../../Component/Banner';
import SliderBanner from '../../Component/SliderBanner';
import Product from '../../Component/Product';
import { getCookie } from '../../shared/cookie';
import { loginCheckDB } from '../../redux/modules/user';

const Main = () => {
  const dispatch = useDispatch();
  const token = getCookie('is_login');
  useEffect(() => {
    dispatch(loginCheckDB);
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
