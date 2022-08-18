import {
    configureStore,
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  
  import { getCookieToken } from '../../shared/cookie';
  
  const usertoken = getCookieToken();
  
  

  export const __getMyLikes = createAsyncThunk(
    'getMyLikes',
    async (payload, thunkAPI) => {
      try {
        const data = await axios.get('http://54.180.122.99/api/myPage/likes', {
            headers: { authorization: usertoken }})
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const myLikesSlice = createSlice({
    name: 'myLikes',
    initialState: {
      myLikes: [],
      isLoading: false,
      error: null,
    },
    reducers: {},
    extraReducers: {
      [__getMyLikes.pending]: (state) => {
        state.isLoading = true;
      },
      [__getMyLikes.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.myLikes = action.payload;
      },
      [__getMyLikes.rejected]: (state, action) => {
        state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      },
    },
  });