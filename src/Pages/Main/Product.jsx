import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { __postProduct } from "../../store";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytes } from 'firebase/storage'
import Icon from '@mui/material/Icon';


function Product() {

    const [urlFile, setUrlFile] = useState('')

    const [title, setTitle] = useState()
    const [size, setSize] = useState()
    const [price, setPrice] = useState()
    const [describe, setDescribe] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChangeFile = (e) => {

        let reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = () => {
            const fileUrl = reader.result;
            setUrlFile(fileUrl)
        }
    }
    

    const postProduct = () => {

        const product = {
            postRequestDto:
                {
                    title: title,
                    size: size,
                    price: price,
                    describe: describe
                },
            multipartFile: urlFile
        }

        dispatch(__postProduct(product))
    }

    // const uploadFB = async(e)=>{
    //     console.log(e.target.files)
    //     const uploaded_file = await uploadBytes(
    //         ref(storage, `images/${e.target.files[0].name}`),
    //         e.target.files[0]
    //     )
    // }

    
    
    return(
        <div>

            
            <Container style={{margin:'4% 0 0 0'}}>

                <div style={{width:'100%'}}>
                    <h1 style={{ display:'flex'}}>래플 상품 등록</h1>

                    <input type='file' accept="img/*"
                        onChange={handleChangeFile}
                        />
                    
                    <img 
                        src={urlFile !== ''? urlFile :<Icon color="primary">add_circle</Icon>} 
                        alt=""
                        style={{width: "494px",
                                height: "370px",
                                borderRadius: "4px",
                                backgroundSize: '100% auto',
                                position: 'relative',
                                backgroundPosition: 'center top',
                                backgroundAttachment: 'fixed'}}/>
                     
                </div>
                
                <div style={{width:'100%', marginTop:'60px'}}>
                    
                    <div><TextField style={{width:'60%', margin:'0 0 20px 0'}} id="standard-basic" label="제품명" variant="standard" onChange={(e)=>{setTitle(e.target.value);}}/></div>
                    <div><TextField style={{width:'60%', margin:'0 0 20px 0'}} id="standard-basic" label="사이즈" variant="standard" onChange={(e)=>{setSize(e.target.value);}}/></div>
                    <div><TextField style={{width:'60%', margin:'0 0 20px 0'}} id="standard-basic" label="가격" variant="standard" onChange={(e)=>{setPrice(e.target.value);}}/></div>
                    <div><TextField style={{width:'60%', margin:'0 0 30px 0'}} id="standard-multiline-static" label="제품설명" multiline rows={4} variant="standard" onChange={(e)=>{setDescribe(e.target.value)}}/></div>
                    
                    <Button variant="contained" endIcon={<SendIcon />} onClick={()=>{
                        if(window.confirm("상품등록을 하시겠어요?")) {
                            postProduct()
                            navigate('/')
                        } else {
                            alert("취소합니다.");
                        }
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