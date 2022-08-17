// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { getCookie } from "../shared/Cookie";
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../shared/cookie';
import styled from 'styled-components';
import nikelogo from '../image/nikelogo.png';

const Banner = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const is_login = getCookie('is_login');
  const user_info = useSelector((state) => state.user);
  // console.log(user_info);

  if (
    //로그인, 회원가입 화면에서는 헤더를 보여주지 않음.
    window.location.pathname === './login' ||
    window.location.pathname === './signup'
  )
    return null;

  return (
    <Header>
      <Logo
        onClick={() => {
          navigate('/');
        }}
      />
      <HeaderText
        onClick={() => {
          navigate('/mypage');
        }}
      >
        사용자님
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
