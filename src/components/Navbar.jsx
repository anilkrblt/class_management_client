import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

const Navbarx  = () => {
    return <Navbar bg="light" data-bs-theme="light">
    <Container >
      <Navbar.Brand href="#home">
        <Image 
        src="/tu_logo.jpg" 
        roundedCircle
        width={70} 
         /></Navbar.Brand>
       <Nav className="ms-auto justify-content-around w-100 gap-3"> 
        <Nav.Link href="#home nav-link active">Ana sayfa</Nav.Link>
        <Nav.Link href="#features">Sınıflar</Nav.Link>
        <Nav.Link href="#pricing">Şikayet oluştur</Nav.Link>
        <Nav.Link href="#features">Sınavlar</Nav.Link>
        <Nav.Link href="#features">Çıkış yap</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
}

export default Navbarx