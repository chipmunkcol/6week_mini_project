import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { productSlice, productsSlice } from '../modules/product';
import { commentSlice } from '../modules/comment';
import { likeSlice } from '../modules/like';
import { myLikesSlice } from '../modules/mylike';
import { signupSlice, idcheckSlice, nicknameSlice } from '../modules/signup';
import { usersSlice } from '../modules/login';

export const store = configureStore(
  {
    reducer: {
      products: productsSlice.reducer,
      product: productSlice.reducer,
      comments: commentSlice.reducer,
      likes: likeSlice.reducer,
      myLikes: myLikesSlice.reducer,
      signup: signupSlice.reducer,
      idcheck: idcheckSlice.reducer,
      nicknamecheck: nicknameSlice.reducer,
      users: usersSlice.reducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
