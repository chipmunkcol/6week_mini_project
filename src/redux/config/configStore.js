import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
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
} from '../modules/user';
export const store = configureStore(
  {
    reducer: {
      signUpDB: signUpDB,
      loginDB: loginDB,
      logoutDB: logoutDB,
      loginCheckDB: loginCheckDB,
      getUser: getUser,
      setUser: setUser,
      logOut: logOut,
      signIdCheck: signIdCheck,
      signNameCheck: signNameCheck,
      reducer: reducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
