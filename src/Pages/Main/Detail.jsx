// import { RESP } from "../../response";
import styled from "styled-components";
import { Button, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { __getProducts, __getComment, __postComment, __deleteComment } from "../../store";



function Detail() {

const [comment, setComment] = useState('')
const [reLoading, setReLoading] = useState(true)

const { isLoading , error , products } = useSelector((state)=> state.products)
const { isLoading2 , error2 , comments } = useSelector((state)=> state.comments)
console.log(isLoading2, error2, comments)

const dispatch = useDispatch()
const navigate = useNavigate()

const params = useParams().id
const param = products.findIndex((v)=>v.id === Number(params))
console.log(params)

useEffect(()=>{
    dispatch(__getProducts())
    dispatch(__getComment())
},[reLoading])



    if (products.length === 0) {
        return <h1 style={{backgroundColor:'yellow'}}>로딩중입니다...</h1>
    }

    if (error || error2) {
        return <h1>{error.message}</h1>
    }

    return(
        <div>
        <div style={{width:'90%', height:'30px', margin:'0 auto 0 auto',backgroundColor:'#ded8c8'}}></div>
        <div style={{border:'1px solid #ced4da', width:'90%', margin:'0 auto 0 auto', padding:'30px'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
                
                <Flex1>
                    
                    <Img productImg={products[param].image} ></Img>

                </Flex1>
                
                <Flex2>

                    <div style={{display:'flex', margin:'10px 10px 16px 10px'}}><span style={{width:'40%'}}>Product Info</span> <span style={{fontSize:'small', color:'#b2b2b2'}}>제품정보</span></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>Title</Title> <Desc>{products[param].title}</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>Size</Title> <Desc>{products[param].size}</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>Like</Title> <Desc>❤ +13</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>Price</Title> <Desc>{products[param].price}</Desc></div>
                    <div style={{display:'flex', margin:'10px', height:'100px', overflow:'auto'}}><Title>Desc</Title> <Desc>{products[param].describe}</Desc></div>
                    
                </Flex2>

            </div>
           
           <ReplyContainer>

                <div style={{height:'80%', overflow: 'auto'}}>
                    {
                        comments.map((val)=>
                            <div key={val.id}>
                                <Reply>
                                    <span style={{display:'flex', width:'90%'}}>[nickName]: {val.comment}</span> 
                                    <span style={{width:'10%'}}><FontAwesomeIcon icon={faTrashCan} type='button' size="lg" onClick={()=>{
                                        dispatch(__deleteComment(val.id))
                                        setReLoading(!reLoading)
                                    }}/></span>
                                </Reply>
                            </div>
                        )
                    }
                </div>

                <InputGroup style={{height:'11%', width:'95%', margin:'10px auto 0 auto'}} className="mb-3" value={comment} onChange={(e)=>{setComment(e.target.value);}}>
                        <Form.Control placeholder="댓글 남기기"aria-label="Recipient's username"aria-describedby="basic-addon2"/>
                        
                        <Button variant="outline-secondary" id="button-addon2" onClick={()=>{
                            if (comment !== '') {
                                dispatch(__postComment({comment: comment}))
                                setComment('')
                                setReLoading(!reLoading)
                            } else {
                                alert('한 글자 이상 입력해주세요')
                                setReLoading(!reLoading)
                            }
                            }}>저장하기
                        </Button> 

                </InputGroup>

            </ReplyContainer>
        </div>
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
    border: 1px solid #ced4da;
    border-radius: 4px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Flex2 = styled.div`
    width: 72%;
    margin-top: 6PX;
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
    width: 98%;
    height: 97%;
    cursor:pointer;
`



export default Detail;