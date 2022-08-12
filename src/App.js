import './App.css';

import { useNavigate, Routes, Route } from 'react-router-dom'
import Main from './Pages/Main/Main';
import Mypage from './Pages/Main/Mypage';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import Product from './Pages/Main/Product';
import Banner from './Component/Banner';



function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      Hello, react!
      <Banner></Banner>
      
    
    
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/mypage' element={<Mypage></Mypage>}></Route>
        <Route path='/product' element={<Product></Product>}></Route>
        
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>



    </div>
  );
}

export default App;
