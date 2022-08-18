import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAccessToken, setUserData } from '../../shared/cookie';

export const __postUsers = createAsyncThunk(
  'users/postUsers',
  async (userData, thunkAPI) => {
    try {
      const data = await axios
        .post('http://54.180.122.99/api/member/login', userData)
        .then((response) => {
          console.log(response);
          setAccessToken(response.headers.authorization);
          setUserData(response.data);
          console.log(setUserData);
          axios.defaults.headers[
            'Authorization'
          ] = `${response.headers.authorization}`;
          window.localStorage.setItem(
            'login-token',
            response.headers.authorization
          );
          document.location.href = '/';
        });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [__postUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [__postUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userinfo = action.payload;
      console.log('username: ' + action.payload.username);
    },
    [__postUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      alert(action.payload.response.data.error.message);
    },
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
