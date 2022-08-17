// import Grid from '../styles/Grid';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import shoes1 from '../image/shoes1.jpg';
import heartbutton from '../image/heartbutton.png';
import { useDispatch, useSelector } from 'react-redux';
import { __getProducts } from '../redux/modules/product';
import { useNavigate } from 'react-router-dom';

//헤더 고정, (좋아요 카운트, 이미지, 이름, 닉네임), Navigate 넣기

const Product = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading , error , products } = useSelector((state)=> state.products)
  // console.log(isLoading, error, products)

  const product = useSelector((state)=> state)
  // console.log(products)

  useEffect(()=>{
    dispatch(__getProducts())
  },[dispatch])


  if (products.lenth === 0) {
    return <h1 style={{backgroundColor:'yellow'}}>로딩중입니다...</h1>
  }

  return (
    <Productcontainer>
      {
        products.map((val)=>
          <Productbox key={val.id} onClick={()=>{ navigate('/detail/'+val.id) }}>
          <Overlay>
            <Heartbutton />
            <HeartText>{products.likesCnt}</HeartText>
          </Overlay>
          <Productimg productImg={val.imgUrl}/>
          <Producttext>{products.title}</Producttext>
        </Productbox>
        )
      }
      
    </Productcontainer>
  );
};

export default Product;

const Productcontainer = styled.div`
  max-width: 1800px;
  height: 250px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Productbox = styled.div`
  width: 400px;
  height: 250px;
  margin: 5px;
`;

const Productimg = styled.div`
  width: 400px;
  height: 250px;
  display: block;
  background: url(${props => props.productImg});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Producttext = styled.div`
  font-family: 'a11';
  font-size: 18px;
  color: black;
`;

const Overlay = styled.div`
  position: absolute;
  width: 400px;
  height: 250px;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 1s;
  :hover {
    opacity: 1;
  }
`;

const Heartbutton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  background: url(${heartbutton});
  background-position: center;
  background-size: cover;
  margin-top: 100px;
`;

const HeartText = styled.div`
  color: white;

  font-family: 'a19';
  font-size: 20px;
`;
