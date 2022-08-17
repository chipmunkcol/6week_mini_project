import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../Pages/Main/Main';
import Mypage from '../Pages/Main/Mypage';
import Product from '../Pages/Main/Product';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Login/Signup';
import Banner from '../Component/Banner';

const Router = () => {
  return (
    <Routes>
      {/* <Banner /> */}
      <Route path="/" element={<Main></Main>} />
      <Route path="/mypage" element={<Mypage></Mypage>} />
      <Route path="/product" element={<Product></Product>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/signup" element={<Signup></Signup>} />
    </Routes>
  );
};

export default Router;
