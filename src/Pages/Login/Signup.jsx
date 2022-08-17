import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import nikelogo from '../../image/nikelogo.png';
import user from '../../image/user.png';
import lock from '../../image/lock.png';
import loginfooter from '../../image/loginfooter.svg';
import { useForm } from 'react-hook-form';
import { signUpDB, signIdCheck, signNameCheck } from '../../redux/modules/user';

const Signup = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickSignup() {
    dispatch(signUpDB(id, pwd, nickname));
  }

  function onClickIdcheck() {
    dispatch(signIdCheck(id));
  }

  function onClickNameCheck() {
    dispatch(signNameCheck(nickname));
  }

  return (
    <Logincontainer>
      <LoginBox>
        <Headerlogo
          onClick={() => {
            navigate('/');
          }}
        />
        <form onSubmit={handleSubmit(onClickSignup)}>
          <Inputbox>
            <label htmlFor="userId" />
            <Idcheckbox>
              <Idcheckinput
                id="userId"
                type="text"
                // {...register('userId', {
                //   required: true,
                //   pattern: {
                //     value: /^[a-zA-Z]*$/,
                //     message: '영문, 숫자 조합으로 4~12자 입력해주세요.',
                //   },
                // )}
                image={user}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                placeholder="아이디"
              />
              <Idcheckbutton
                onClick={() => {
                  onClickIdcheck();
                }}
              >
                중복확인
              </Idcheckbutton>
            </Idcheckbox>
            <Errorsmessage>
              {errors.userId?.type === 'required' &&
                '아이디를 입력하시길 바랍니다'}
              {errors.userId?.type === 'pattern' && errors.userId.message}
            </Errorsmessage>

            <Idcheckbox>
              <label htmlFor="nickname" />
              <NicknameCheck
                id="nickname"
                type="text"
                {...register('nickname', {
                  maxLength: {
                    value: 8,
                    message: '닉네임은 8글자 이하로 입력하여 주시길 바랍니다.',
                  },
                  minLength: {
                    value: 2,
                    message:
                      '닉네임은 2글자 이상으로 입력하여 주시길 바랍니다.',
                  },
                })}
                image={user}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                placeholder="닉네임"
              />
              <NicknameCheckbutton
                onClick={() => {
                  onClickNameCheck();
                }}
              >
                중복확인
              </NicknameCheckbutton>
            </Idcheckbox>
            <Errorsmessage>
              {errors.nickname?.type === 'maxLength' && errors.nickname.message}
              {errors.nickname?.type === 'minLength' && errors.nickname.message}
            </Errorsmessage>
            {/* /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{4,32}$/ */}
            <Idpwinput
              id="password"
              type="password"
              autoComplete="off"
              {...register('password', {
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-ZS]).{4,32}/,
                  message:
                    '비밀번호를 4~32자로 영문 소문자, 숫자를 조합해서 사용하세요. ',
                },
              })}
              image={lock}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              placeholder="비밀번호"
            />
            <Errorsmessage>
              {errors.password?.type === 'pattern' && errors.password.message}
            </Errorsmessage>
            <Idpwinput
              id="password2"
              type="password"
              autoComplete="off"
              {...register('password2', {
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return (
                      password === value || '비밀번호가 일치하지 않습니다.'
                    );
                  },
                },
              })}
              image={lock}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              placeholder="비밀번호를 다시 입력해주세요."
            />
            <Errorsmessage>
              {errors.password2?.type === 'validate' &&
                errors.password2.message}
            </Errorsmessage>
          </Inputbox>
          <Loginbutton type="submit">회원 가입</Loginbutton>
        </form>
        <Footer />
      </LoginBox>
    </Logincontainer>
  );
};
export default Signup;

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
  background: white;
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
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const Idcheckbox = styled.div`
  display: flex;
`;

const Idcheckbutton = styled.div`
  width: 120px;
  height: 60px;
  background: black;
  border: none;
  border-radius: 0.625rem;
  margin-top: 28px;
  margin-left: 25px;
  padding-top: 16px;

  color: white;
  font-family: 'a19';
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const Idcheckinput = styled.input`
  width: 350px;
  height: 55px;
  margin-top: 30px;
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

const NicknameCheck = styled.input`
  width: 350px;
  height: 55px;
  margin-top: 30px;
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

const NicknameCheckbutton = styled.div`
  width: 120px;
  height: 60px;
  background: black;
  border: none;
  border-radius: 0.625rem;
  margin-top: 25px;
  margin-left: 25px;
  padding-top: 16px;

  color: white;
  font-family: 'a19';
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
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
