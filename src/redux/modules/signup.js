import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const __postSignup = createAsyncThunk(
  'signup/postSignup',
  async (userData, thunkAPI) => {
    try {
      const data = await axios
        .post('http://54.180.122.99/api/member/signup', userData)
        .then((response) => {
          console.log(response);
          window.alert('회원가입이 완료되었습니다.');
          document.location.href = '/login';
        });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postIdCheck = createAsyncThunk(
  'idcheck/postIdCheck',
  async (userName, thunkAPI) => {
    try {
      const data = await axios
        .post('http://54.180.122.99/api/member/checkId', userName, {
          headers: { 'Content-Type': `application/json` },
        })
        .then((response) => {
          console.log(response);
          if (response.data === true) {
            window.alert('사용할 수 있는 아이디입니다.');
          } else {
            window.alert('이미 존재하는 아이디입니다.');
          }
        });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postNicknameCheck = createAsyncThunk(
  'nicknamecheck/postNicknameCheck',
  async (Nickname, thunkAPI) => {
    try {
      const data = await axios
        .post('http://54.180.122.99/api/member/checkNickname', Nickname, {
          headers: { 'Content-Type': `application/json` },
        })
        .then((response) => {
          console.log(response);
          if (response.data === true) {
            window.alert('사용할 수 있는 닉네임입니다.');
          } else {
            window.alert('이미 존재하는 닉네임입니다.');
          }
        });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    signup: [],
  },
  reducers: {},
  extraReducers: {},
});

export const idcheckSlice = createSlice({
  name: 'idcheck',
  initialState: {
    idcheck: [],
  },
  reducers: {},
  extraReducers: {},
});

export const nicknameSlice = createSlice({
  name: 'nicknamecheck',
  initialState: {
    nickNameCheck: [],
  },
  reducers: {},
  extraReducers: {},
});
