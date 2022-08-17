import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import nikelogo from '../../image/nikelogo.png';
import user from '../../image/user.png';
import lock from '../../image/lock.png';
import loginfooter from '../../image/loginfooter.svg';
import { useForm } from 'react-hook-form';
import { loginDB } from '../../redux/modules/user';

const Login = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const dispatch = useDispatch();

  function onClickLogin() {
    dispatch(loginDB(id, pwd));
  }

  return (
    <Logincontainer>
      <LoginBox>
        <Headerlogo
          onClick={() => {
            navigate('/');
          }}
        />
        <form onSubmit={handleSubmit(onClickLogin)}>
          <Inputbox>
            <label htmlFor="userId" />
            <Idpwinput
              id="userId"
              type="text"
              autoComplete="off"
              {...register('userId', {
                required: true,
              })}
              image={user}
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="아이디"
            />
            <Errorsmessage>
              {errors.userId?.type === 'required' &&
                '아이디를 입력하시길 바랍니다'}
            </Errorsmessage>
            <label htmlFor="password" />
            <Idpwinput
              id="password"
              type="password"
              autoComplete="off"
              // {...register('password', {
              //   required: true,
              //   pattern: {
              //     value:
              //       /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
              //     message:
              //       '비밀번호를 8~16자로 영문 소문자, 숫자, 특수기호를 조합해서 사용하세요. ',
              //   },
              // })}
              image={lock}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              placeholder="비밀번호"
            />
            <Errorsmessage>
              {errors.password?.type === 'required' &&
                '비밀번호를 입력하시길 바랍니다.'}
              {errors.password?.type === 'pattern' && errors.password.message}
            </Errorsmessage>
          </Inputbox>
          <Loginbutton>LOGIN</Loginbutton>
        </form>
        <SignMove
          onClick={() => {
            navigate('/signup');
          }}
        >
          아직 회원이 아니신가요?
        </SignMove>
        <Footer />
      </LoginBox>
    </Logincontainer>
  );
};

export default Login;

const Logincontainer = styled.div`
  max-width: 75rem;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 43.75rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin: auto;
`;

const Headerlogo = styled.div`
  width: 18.75rem;
  height: 18.75rem;
  background: url(${nikelogo});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

const Inputbox = styled.div`
  width: 37.5rem;
  height: 15.625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Idpwinput = styled.input`
  width: 31.25rem;
  height: 3.75rem;
  margin-top: 1.875rem;
  padding-left: 3.125rem;
  background: url(${(props) => props.image});
  background-position: left;
  background-size: 2.5rem, 2.5rem;
  background-repeat: no-repeat;

  font-family: 'a15';
  font-size: 0.938em;

  border: 1px solid gray;
  border-radius: 0.625rem;
`;

const Loginbutton = styled.button`
  width: 300px;
  height: 4.375rem;
  background: black;
  border: none;
  border-radius: 0.625rem;
  margin-top: 20px;

  color: white;
  font-family: 'a19';
  font-size: 1.25em;
  font-weight: 800;
  /* transition: all 1s, color 0.5; */
  &:hover {
    background: #6073ba;
    /* box-shadow: 300px 0 0 0 rgba(0, 0, 0, 0.5) inset; */
  }
`;

const SignMove = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-top: 30px;
  cursor: pointer;
  :hover {
    color: blue;
  }
`;

const Errorsmessage = styled.span`
  margin-top: 20px;
`;

const Footer = styled.div`
  width: 18.75rem;
  height: 18.75rem;
  background: url(${loginfooter});
  background-position: center;
  background-size: cover;
`;
