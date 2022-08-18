// import Grid from '../styles/Grid';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import heartbutton from '../../image/heartbutton.png';
import { useDispatch, useSelector } from 'react-redux';
import { __getProducts } from '../../redux/modules/product';
import { __getMyLikes } from '../../redux/modules/mylike';
import { useNavigate } from 'react-router-dom';
import Banner from '../../Component/Banner';
import { Container, Row, Col } from 'react-bootstrap';

//헤더 고정, (좋아요 카운트, 이미지, 이름, 닉네임), Navigate 넣기

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, myLikes } = useSelector((state) => state.myLikes);
        console.log(isLoading, error, myLikes)
//   const myProduct = useSelector((state)=>state)
//   console.log(myProduct)

  useEffect(() => {
    // dispatch(__getProducts());
    dispatch(__getMyLikes())
  }, [dispatch]);

  if (myLikes.length === 0) {
    return <h1 style={{ backgroundColor: 'yellow' }}>로딩중입니다~ 2초가 지났다면 새로고침을 해주세요..^^7</h1>;
  }

  return (
    <div>
    <Banner/>
        <Container>

            <h1 style={{fontSize:'30px', fontWeight:'700', margin:'20px 0 40px 0'}}> 내가 좋아요 한 상품 </h1>

           <Row md={2}>

            {myLikes.map((val) => (
                <Col style={{margin:'auto'}}>
                    <Productbox
                    key={val.id}
                    onClick={() => {
                        navigate('/detail/' + val.id);
                    }}>
                    <Overlay>
                        <Heartbutton />
                        <HeartText>{myLikes.likesCnt}</HeartText>
                    </Overlay>
                    <Productimg productImg={val.imgUrl} />
                    <Producttext>{myLikes.title}</Producttext>
                    </Productbox>
                </Col>
            ))}
            
           </Row> 
        </Container>

        

    </div>
  );
};

export default MyPage;

const Productcontainer = styled.div`
  max-width: 1800px;
  height: 250px;
  margin: auto;
  margin-top: 50px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
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
  background: url(${(props) => props.productImg});
  background-position: center;
  background-size: cover;
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
