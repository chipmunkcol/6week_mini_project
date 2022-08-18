import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../Pages/Main/Main';
import Product from '../Pages/Main/Product';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Login/Signup';
import Banner from '../Component/Banner';
import Detail from '../Pages/Main/Detail';
import MyPage from '../Pages/Main/Mypage';

const Router = () => {
  return (
    <Routes>
      {/* <Banner /> */}
      <Route path="/" element={<Main></Main>} />
      <Route path="/mypage/likes" element={<MyPage></MyPage>} />
      <Route path={'/detail/:id'} element={<Detail></Detail>} />
      <Route path="/product" element={<Product></Product>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/signup" element={<Signup></Signup>} />
    </Routes>
  );
};

export default Router;
