// import { RESP } from "../../response";
import styled from "styled-components";
import { Button, InputGroup, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { __getProducts, __getComment, __postComment } from "../../store";



function Detail() {

const [comment, setComment] = useState('')

const { isLoading , error , products } = useSelector((state)=> state.products)
const { isLoading2 , error2 , comments } = useSelector((state)=> state.comments)
console.log(isLoading2, error2, comments)

const dispatch = useDispatch()

const params = Number(useParams().id)
const param = products.findIndex((v)=>v.id === params)
// console.log(param)

useEffect(()=>{
    dispatch(__getProducts())
    dispatch(__getComment())
},[dispatch])



    if (isLoading || isLoading2) {
        return <h1 style={{backgroundColor:'yellow'}}>로딩중입니다...</h1>
    }

    if (error || error2) {
        return <h1>{error.message}</h1>
    }

    return(
        <div>
            <div style={{display:'flex', flexDirection:'row'}}>
                
                <Flex1>
                    
                    <Img productImg={products[param].image} ></Img>

                </Flex1>
                
                <Flex2>

                    <div style={{display:'flex', margin:'10px'}}><Title>제품명</Title> <Desc>{products[param].title}</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>사이즈</Title> <Desc>{products[param].size}</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>좋아요</Title> <Desc>❤ +13</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>가격</Title> <Desc>{products[param].price}</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>상품설명</Title> <Desc>{products[param].describe}</Desc></div>
                    
                </Flex2>

            </div>
           
           <ReplyContainer>

                <div style={{height:'80%', overflow: 'auto'}}>
                    {
                        comments.map((val)=>
                            <div key={val.id}>
                                <Reply>[nickName]: {val.comment} &#10006;</Reply>
                            </div>
                        )
                    }
                </div>

                <InputGroup style={{height:'11%', width:'95%', margin:'10px auto 0 auto'}} className="mb-3" onChange={(e)=>{setComment(e.target.value);}}>
                        <Form.Control placeholder="댓글 남기기"aria-label="Recipient's username"aria-describedby="basic-addon2"/>
                        
                        <Button variant="outline-secondary" id="button-addon2" onClick={()=>{
                            dispatch(__postComment({comment: comment}))}}>저장하기
                        </Button> 

                </InputGroup>

            </ReplyContainer>
        </div>
    );
}


const ReplyContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: 75%;
    margin: 30px auto 0 auto;
    height: 300px;
`


const Reply = styled.div`
    display: flex;
    margin: 7px 25px 0 25px;
    border-bottom: 1px solid #ced4da;
    padding: 5px;
`

const Flex1 = styled.div`
    width: 100%;
`

const Flex2 = styled.div`
    width: 100%;
`

const Title = styled.span`
    width: 40%;
    color: gray;
`

const Desc = styled.span`
    width: 100%;
    font-weight: bold;
    text-align: left;
`

const Img = styled.div`
    background-image: url(${props => props.productImg});
    background-position: center;
    background-size: cover;
    background-color: aqua;
    width: 100%;
    height: 300px;
    cursor:pointer;
`



export default Detail;