import React from 'react';
import styled from 'styled-components';
import { useSelector, dispatch } from 'react-redux';
import Banner from '../../Component/Banner';
import { getCookieToken } from '../../shared/cookie';
import checkbutton from '../../image/checkbutton.png';
import imagebutton from '../../image/imagebutton.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { __postProduct } from '../../redux/modules/product';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../shared/firebase';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const Product = () => {
  // const [urlFile, setUrlFile] = useState('')
  const [fileUrl, setFileUrl] = useState('');
  const [title, setTitle] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [describe, setDescribe] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleChangeFile = (e) => {

  //     let reader = new FileReader();

  //     if (e.target.files[0]) {
  //         reader.readAsDataURL(e.target.files[0])
  //     }
  //     reader.onload = () => {
  //         const fileUrl = reader.result;
  //         setUrlFile(fileUrl)
  //     }
  // }

  const uploadFB = async (e) => {
    console.log(e.target.files);
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(uploaded_file);

    const file_url = await getDownloadURL(uploaded_file.ref);

    setFileUrl(file_url);
  };

  const postProduct = () => {
    const product = {
      title: title,
      size: size,
      price: price,
      content: describe,
      imgUrl: fileUrl,
    };

    console.log(product);
    dispatch(__postProduct(product));
  };

  return (
    <ProductContainer>
      <Banner />
      <ProductTitle>래플 상품 등록</ProductTitle>
      <ProductBox>
        <Overlay>
          <Appstyle>
            <label htmlFor="ex_file">
              <div className="btnStart">
                <img
                  src={fileUrl !== '' ? fileUrl : imagebutton}
                  alt="btnStart"
                />
              </div>
            </label>
            <input
              type="file"
              id="ex_file"
              accept="image/jpg, image/png, image/jpeg"
              onChange={uploadFB}
            />
          </Appstyle>
        </Overlay>
        <TextBox>
          <Name>
            <AddINput
              type="text"
              placeholder="제품명"
              padding={'110px'}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></AddINput>
          </Name>
          <Price>
            <AddINput
              type="text"
              placeholder="가격"
              padding={'120px'}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></AddINput>
          </Price>
          <Dosc>
            <AddINput
              type="text"
              placeholder="설명"
              padding={'120px'}
              onChange={(e) => {
                setDescribe(e.target.value);
              }}
            ></AddINput>
          </Dosc>
          <Box>
            <Size>
              <SizeInput
                type="text"
                placeholder="사이즈"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              ></SizeInput>
            </Size>
            <Registration
              onClick={() => {
                if (window.confirm('상품등록을 하시겠어요?')) {
                  postProduct();
                  navigate('/');
                } else {
                  alert('취소합니다.');
                }
              }}
            ></Registration>
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
  width: 1300px;
  height: 600px;
  margin: 30px auto;
`;

const Appstyle = styled.div`
  width: 800px;
  height: 600px;
  background: black;
  float: left;
  img {
    width: 800px;
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
  transition: all 2s;
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
