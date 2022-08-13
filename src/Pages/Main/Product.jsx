import { useState } from "react";
import styled from "styled-components";



function Product() {

    const [title, setTitle] = useState()
    const [size, setSize] = useState()
    const [price, setPrice] = useState()
    const [content, setContent] = useState()
    
    return(
        <div>
            <h1>상품등록페이지 입니다!</h1>
            <Container>
                <div style={{width:'100%', height:'400px', backgroundColor:'gray'}}>
                    <input type='file'/>
                </div>
                <div style={{width:'100%'}}>
                    <div>제품명: <input onChange={(e)=>{setTitle(e.target.value)}}/></div>
                    <div>사이즈: <input onChange={(e)=>{setSize(e.target.value)}}/></div>
                    <div>가격: <input onChange={(e)=>{setPrice(e.target.value)}}/></div>
                    <div>설명: <input onChange={(e)=>{setContent(e.target.value)}}/></div>
                    <button onClick={()=>{
                        
                    }}>저장하기</button>
                </div>
            </Container>

        </div>
    );
}

export default Product;

const Container = styled.div`
    display: flex;
    flex-direction: row;

`;