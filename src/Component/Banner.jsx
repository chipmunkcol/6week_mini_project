// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { getCookie } from "../shared/Cookie";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getCookieToken,
  getUserData,
  removeCookieToken,
  removeUserData,
} from '../shared/cookie';
import styled from 'styled-components';
import nikelogo from '../image/nikelogo.png';

const Banner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cookie = getCookieToken();
  const token = localStorage.getItem('login-token');

  const username = getUserData();

  const logout = () => {
    removeCookieToken();
    removeUserData();
    window.location.href = '/';
  };

  return (
    <Header>
      <Logo
        onClick={() => {
          navigate('/');
        }}
      />
      {cookie ? (
        <>
          <HeaderText
            onClick={() => {
              navigate('/mypage/likes');
            }}
          >
            {username}
          </HeaderText>
          <HeaderText
            onClick={() => {
              navigate('/product');
            }}
          >
            상품등록
          </HeaderText>
          <HeaderText
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </HeaderText>
        </>
      ) : (
        <>
          <HeaderText
            onClick={() => {
              navigate('/product');
            }}
          >
            상품등록
          </HeaderText>
          <HeaderText
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </HeaderText>
          <HeaderText
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </HeaderText>
        </>
      )}
    </Header>
  );
};

export default Banner;

const Header = styled.div`
  max-width: 1800px;
  height: 100px;
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: center;
  position: relative;
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  background: url(${nikelogo});
  background-position: center;
  background-size: cover;
  position: absolute;
  left: 0;
  cursor: pointer;
`;

const HeaderText = styled.div`
  font-family: 'a15';
  font-size: 16px;
  display: flex;
  justify-content: center;
  padding-left: 50px;
  cursor: pointer;
`;
