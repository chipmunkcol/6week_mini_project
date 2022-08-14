import { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


function Product() {

    const [title, setTitle] = useState()
    const [size, setSize] = useState()
    const [price, setPrice] = useState()
    const [content, setContent] = useState()
    
    return(
        <div>

            
            <Container style={{margin:'4% 0 0 0'}}>
                <div style={{width:'30%', marginTop:'7%'}}> 🎈nickname이 <br/>
                                             들어옵니다 
                </div>

                <div style={{width:'100%'}}>
                    <h1 style={{ display:'flex'}}>래플 상품 등록</h1>
                    
                    <div style={{width:'100%', height:'400px', backgroundColor:'gray', marginTop:'16px'}}>
                        
                        
                        
                        <input type='file'/>
                    
                    </div>
                </div>
                
                <div style={{width:'100%', marginTop:'60px'}}>
                    
                    <div><TextField style={{width:'60%', margin:'0 0 20px 0'}} id="standard-basic" label="제품명" variant="standard" onChange={(e)=>{setTitle(e.target.value);}}/></div>
                    <div><TextField style={{width:'60%', margin:'0 0 20px 0'}} id="standard-basic" label="사이즈" variant="standard" onChange={(e)=>{setTitle(e.target.value);}}/></div>
                    <div><TextField style={{width:'60%', margin:'0 0 20px 0'}} id="standard-basic" label="가격" variant="standard" onChange={(e)=>{setTitle(e.target.value);}}/></div>
                    <div><TextField style={{width:'60%', margin:'0 0 30px 0'}} id="standard-multiline-static" label="제품설명" multiline rows={4} variant="standard" onChange={(e)=>{setContent(e.target.value)}}/></div>
                    
                    <Button variant="contained" endIcon={<SendIcon />} onClick={()=>{
                        axios.post('', {title: title, size: size, price: price, content: content})
                    }}>
                    저장하기
                    </Button>

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