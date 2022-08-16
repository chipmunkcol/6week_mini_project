// import { RESP } from "../../response";
import styled from "styled-components";
import { Container, Col, Row, } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { __getProducts } from "../../store";


function Main(){

    // const [pdata, setPdata] = useState([])

    // const resp = RESP.products.result

    // const products = () => {
    //     axios.get('https://codingapple1.github.io/shop/data2.json')
    //     .then((data)=>{
    //         setPdata(data.data)
    //         console.log(data.data)
    //     })
    //     .catch((error)=>{
    //         console.log('error:'+error)
    //     })
    // }

    const dispatch = useDispatch();

    const { isLoading , error , products } = useSelector((state)=> state.products)
    // console.log(isLoading, error, products)
    

    useEffect(()=>{
        // products()
        dispatch(__getProducts())
    },[dispatch])
    
    const navigate = useNavigate()

    if (isLoading) {
        return <h1 style={{backgroundColor:'yellow'}}>로딩중입니다...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return(
        <div>
            <Container>

                <TitleImg/>

                <Row md={3}>
                {
                    products.map((val)=>
                        <Col key={val.id} style={{textAlign:'center'}} onClick={()=>{ navigate('/detail/'+val.id) }}>
                                <Img productImg={val.image}></Img>
                                <div>{val.title}</div>
                                <div>{val.size}</div>
                                <div>❤ +{val.likes}</div>
                        </Col>
                    )
                }
                </Row>
            </Container>

        </div>
    );
}

const Img = styled.div`
    background-image: url(${props => props.productImg});
    background-position: center;
    background-size: cover;
    background-color: aqua;
    width: 200px;
    height: 200px;
    margin: 0 auto 0 auto;
    cursor:pointer;
`

const TitleImg = styled.div`
    background-image: url('https://p4.wallpaperbetter.com/wallpaper/511/624/9/nike-logo-just-do-it-simple-background-wallpaper-preview.jpg');
    background-position: center;
    background-size: cover;
    width: 90%;
    height: 300px;
    margin: 4% auto 4% auto;
`



export default Main;