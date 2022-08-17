// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAction, handleAction, handleActions } from 'redux-actions'; //액션 생성 함수 라이브러리
import { getCookie, setCookie, deleteCookie } from '../../shared/cookie';
import axios from 'axios';
import produce from 'immer'; //불변성 유지
import { useNavigate } from 'react-router-dom';

//액션
const SET_USER = 'SET_USER';
const GET_USER = 'GET_USER';
const LOG_OUT = 'LOG_OUT';

const initialState = {
  user: null,
  is_login: false,
};
const user_initial = {
  nickname: 'user1',
};

//액샌 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//로그인
const loginDB = (id, password) => {
  return function (dispatch, getState) {
    // console.log(dispatch);
    axios({
      method: 'POST',
      url: 'http://54.180.122.99/api/member/login',
      data: {
        username: id,
        password: password,
      },
    })
      .then((response) => {
        console.log(response);
        dispatch(
          setUser({
            username: response.data.username,
            nickname: response.data.nickname,
          })
        );
        //토큰을 받아 저장
        const accessToken = response.headers.authorization;
        setCookie('is_login', `${accessToken}`);
        document.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//회원가입
const signUpDB = (id, password, nickname) => {
  return function () {
    axios({
      method: 'POST',
      url: 'http://54.180.122.99/api/member/signup',
      data: {
        username: id,
        password: password,
        nickname: nickname,
      },
    })
      .then((response) => {
        window.alert('회원가입이 완료되었습니다.');
        document.location.href = '/login';
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

//아이디 중복확인
const signIdCheck = (id) => {
  return function () {
    axios({
      method: 'POST',
      url: 'http://54.180.122.99/api/member/checkId',
      data: {
        username: id,
      },
    })
      .then((response) => {
        console.log(response); //data 구별 지어줄만한거 필요함
        if (response.data.success === false) {
          window.alert('이미 존재하는 아이디입니다.');
        } else {
          window.alert('사용할 수 있는 아이디입니다.');
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
};
// 닉네임 중복확인
const signNameCheck = (nickname) => {
  return function () {
    axios({
      method: 'POST',
      url: 'http://54.180.122.99/api/member/checkNickname', //404 뜨는데 코드상 문제 X
      data: {
        nickname: nickname,
      },
    })
      .then((response) => {
        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

//로그인 유지
// 저장소에 토큰이 존재하는 경우
//서버에 토큰을 받아 유효성 검증 후 유효하다면 유저 정보를 주어 자동 로그인
const loginCheckDB = () => {
  return function () {
    const token = getCookie('is_login');
    console.log(token);
    axios({
      method: 'POST',
      url: 'http://54.180.122.99/api/member/login',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        // dispatch(
        //   setUser({
        //     email: response.data.email,
        //     nickname: response.data.nickname,
        //   })
        // );
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };
};

// 로그아웃
const logoutDB = () => {
  return function (dispatch) {
    dispatch(logOut());
    useNavigate('/');
    //로그아웃 시 메인 페이지로 이동
  };
};

// 배열이나 객체를 업데이트 해야 할 때에는 직접 수정 하면 안되고 불변성을 지켜주면서 업데이트를
// 해주어야 한다 => immer produce
const reducer = handleActions(
  {
    [SET_USER]: (state, action) =>
      //첫번째 파라미터는 수정하고 싶은 상태, 두번째 파라미터 어떻게 업데이트하고 싶을지
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        console.log(action);
      }),
    // [LOG_OUT]: (state, action) =>
    //   produce(state, (draft) => {
    //     deleteCookie('is_login');
    //     draft.user = null;
    //     draft.is_login = false;
    //   }),
    // [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export {
  loginDB,
  logoutDB,
  loginCheckDB,
  signUpDB,
  getUser,
  setUser,
  logOut,
  signIdCheck,
  signNameCheck,
  reducer,
};
