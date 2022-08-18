
import Banner from '../../Component/Banner';
import { getCookie } from '../../shared/cookie';

// import { RESP } from "../../response";
import HeartImg from '../../image/love.png'
import styled from "styled-components";
import { Button, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faHeart } from '@fortawesome/free-solid-svg-icons'

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { __getProduct, __postProduct, __deleteProduct } from '../../redux/modules/product';
import { __getComment, __postComment, __deleteComment } from '../../redux/modules/comment'
import { __postLike } from '../../redux/modules/like'


function Detail() {

const [comment, setComment] = useState('')

const [reLoading, setReLoading] = useState(true)

const { isLoading, error, product } = useSelector((state)=> state.product)
console.log( product )
const commentList = product.commentList
console.log(commentList)
const { isLoading2 , error2 , comments } = useSelector((state)=> state.comments)
// const comments = useSelector((state)=> state.comments)
console.log(comments)

const dispatch = useDispatch()
const navigate = useNavigate()

const params = useParams().id
// const param = products.findIndex((v)=>v.id === Number(params))
// console.log(params)

useEffect(()=>{
    dispatch(__getProduct(params))
    // dispatch(__getComment(params))
},[reLoading])





if (product.length === 0) {
    return <h1 style={{backgroundColor:'yellow', height:'500px', display:'fles', justifyContent:'center',alignItems:'center'}}>로딩중입니다...</h1>
}

// if (error || error2) {
//     return <h1>{error.message}</h1>
// }

    return(
        <div>
          <Banner />
        <div style={{width:'1000px', height:'30px', margin:'0 auto 0 auto',backgroundColor:'#ded8c8'}}>
            <FontAwesomeIcon icon={faTrashCan} type='button' size="lg" style={{float:'right', margin:'5px 21px 0 0', color:'crimson'}} onClick={()=>{
                if(window.confirm("정말 삭제하나요?")) {
                    console.log(params)
                    dispatch(__deleteProduct(params))
                    alert("삭제되었습니다.");
                    navigate('/')
                }
            }}/>
        </div>
        <div style={{border:'1px solid #ced4da', width:'1000px', height:'750px', margin:'0 auto 0 auto', padding:'30px'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
                
                <Flex1>
                    
                    <Img productImg={product.imgUrl} ></Img>

                </Flex1>
                
                <Flex2>

                    <div style={{display:'flex', margin:'10px 10px 16px 10px'}}><span style={{width:'40%'}}>Product Info</span> <span style={{fontSize:'small', color:'#b2b2b2'}}>제품정보</span></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>Title</Title> <Desc>{product.title}</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>Size</Title> <Desc>{product.size}</Desc></div>
                    
                    <div style={{display:'flex', margin:'10px'}}><Title>Price</Title> <Desc>{product.price}</Desc></div>
                    <div style={{display:'flex', margin:'10px'}}><Title>Like</Title> <Desc type='button' onClick={()=>{ 
                        dispatch(__postLike(params))
                        
                        setTimeout(() => {
                          setReLoading(!reLoading)
                        }, 500); 
                      }}> 
                          <img src={HeartImg} style={{width:'10%'}} />
                          <span> + {product.likesCnt}</span></Desc>
                    </div>
                    <div style={{display:'flex', margin:'10px', height:'100px', overflow:'auto'}}><Title>Desc</Title> <Desc>{product.content}</Desc></div>
                    
                </Flex2>

            </div>
           
          <div style={{ border:'1px solid #ced4da', width:'75%', height:'370px', display:'flex', margin:'20px auto 0 auto'  }}>
           <ReplyContainer>

                <div style={{height:'80%', overflow: 'auto'}}>
                    {
                        commentList.map((val)=>
                            <div key={val.id}>
                                <Reply>
                                    <span style={{display:'flex', width:'90%'}}>{val.nickname}: {val.content}</span> 
                                    <span style={{width:'10%'}}><FontAwesomeIcon icon={faTrashCan} type='button' size="lg" onClick={()=>{
                                        dispatch(__deleteComment(val.id))
                                        setTimeout(() => {
                                            setReLoading(!reLoading)
                                        }, 500);
                                    }}/></span>
                                </Reply>
                            </div>
                        )
                    }
                </div>

                <InputGroup style={{height:'11%', width:'95%', margin:'10px auto 0 auto'}} className="mb-3" onChange={(e)=>{setComment(e.target.value);}}>
                        <Form.Control placeholder="댓글 남기기"aria-label="Recipient's username"aria-describedby="basic-addon2" value={comment}/>
                        
                        <Button variant="outline-secondary" id="button-addon2" onClick={()=>{
                            if (comment !== '') {
                                const postComment = {comment: comment, productId: params}
                                dispatch(__postComment(postComment))
                                setTimeout(() => {
                                    setReLoading(!reLoading)
                                }, 500);
                            } else {
                                alert('한 글자 이상 입력해주세요')
                                setReLoading(!reLoading)
                            }
                            setComment('')
                            }}>저장하기
                        </Button> 

                </InputGroup>

            </ReplyContainer>
            </div>
          </div>
        </div>
    );
}


const ReplyContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: 98%;
    height: 96%;
    margin: auto;
    background-color: snow;
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