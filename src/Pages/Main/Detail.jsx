import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, dispatch } from 'react-redux';
import Banner from '../../Component/Banner';
import { getCookie } from '../../shared/cookie';

function Detail() {
  return <DetailContainer></DetailContainer>;
}

export default Detail;

const DetailContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
