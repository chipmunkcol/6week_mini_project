import { RESP } from "../../response";
import styled from "styled-components";
import { Container, Col, Row, } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
    console.log(isLoading, error, products)
    

    useEffect(()=>{
        // products()
        dispatch(__getProducts())
    },[])
    


    if (isLoading) {
        return <h1 style={{backgroundColor:'yellow'}}>로딩중입니다...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return(
        <div>
            <h1>메인페이지 입니다!</h1>

            <Container>
                <Row md={3}>
                {
                    products.map((val)=>
                        <Col key={val.id}>
                                <Img productImg={val.imgUrl}></Img>
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
    width: 200px;
    height: 200px;

    cursor:pointer
`


export default Main;