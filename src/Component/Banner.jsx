import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, Routes, Route } from 'react-router-dom'


function Banner() {

    const navigate = useNavigate();
    

    return(
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">2조 화이팅!✨</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/mypage') }}>MyPage</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/product') }}>상품등록</Nav.Link>

            <Nav.Link onClick={()=>{ navigate('/login') }}>Login</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/signup') }}>SingUp</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default Banner;