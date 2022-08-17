import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, dispatch } from 'react-redux';
import Banner from '../../Component/Banner';
import { getCookie } from '../../shared/cookie';
import checkbutton from '../../image/checkbutton.png';
import imagebutton from '../../image/imagebutton.jpg';

const Product = () => {
  return (
    <ProductContainer>
      <Banner />
      <ProductTitle>래플 상품 등록</ProductTitle>
      <ProductBox>
        <Overlay>
          <Appstyle>
            <label htmlFor="ex_file">
              <div className="btnStart">
                <img src={imagebutton} alt="btnStart" />
              </div>
            </label>
            <input
              type="file"
              id="ex_file"
              accept="image/jpg, image/png, image/jpeg"
            />
          </Appstyle>
        </Overlay>
        <TextBox>
          <Name>
            <AddINput
              type="text"
              placeholder="제품명"
              padding={'110px'}
            ></AddINput>
          </Name>
          <Price>
            <AddINput
              type="text"
              placeholder="가격"
              padding={'120px'}
            ></AddINput>
          </Price>
          <Dosc>
            <AddINput
              type="text"
              placeholder="설명"
              padding={'120px'}
            ></AddINput>
          </Dosc>
          <Box>
            <Size>
              <SizeInput type="text" placeholder="사이즈"></SizeInput>
            </Size>
            <Registration></Registration>
          </Box>
        </TextBox>
      </ProductBox>
    </ProductContainer>
  );
};

export default Product;

const ProductContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const ProductTitle = styled.div`
  height: 50px;
  display: flex;
  margin-left: 160px;
  margin-top: 30px;

  font-family: 'a15';
  font-size: 30px;
`;

const ProductBox = styled.div`
  width: 1600px;
  height: 600px;
  margin: 30px auto;
`;

const Appstyle = styled.div`
  width: 1100px;
  height: 600px;
  background: black;
  float: left;
  img {
    width: 1100px;
    height: 600px;
  }
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 3s;
  :hover {
    opacity: 1;
  }
`;

const TextBox = styled.div`
  width: 400px;
  height: 600px;
  float: right;
  justify-content: column;
`;

const Name = styled.div`
  width: 400px;
  height: 110px;
  background: black;

  border-radius: 10px;
`;

const Price = styled.div`
  width: 400px;
  height: 110px;
  margin-top: 50px;
  background: black;
  border-radius: 10px;
`;

const Box = styled.div`
  display: flex;
  justify-content: row;
`;

const Dosc = styled.div`
  width: 400px;
  height: 110px;
  margin-top: 50px;
  background: black;
  border-radius: 10px;
`;

const Size = styled.div`
  width: 230px;
  height: 80px;
  margin-top: 90px;
  background: black;
  border-radius: 10px;
`;

const SizeInput = styled.input`
  width: 150px;
  height: 50px;
  background: none;
  margin-top: 15px;
  border: none;
  text-align: center;

  color: white;
  font-size: 25px;
  font-family: 'a11';
  font-weight: 600;
  &::placeholder {
    color: white;
    padding: 40px;
  }
`;

const Registration = styled.button`
  width: 120px;
  height: 80px;
  margin-top: 90px;
  margin-left: 50px;
  border-radius: 10px;
  border: none;
  background: url(${checkbutton});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const AddINput = styled.input`
  width: 300px;
  height: 60px;
  margin: auto;
  margin-top: 25px;
  background: none;
  border: none;
  text-align: center;

  color: white;
  font-family: 'a11';
  font-size: 25px;
  font-weight: 600;

  &::placeholder {
    color: white;
    padding: ${(props) => props.padding};
  }
`;
