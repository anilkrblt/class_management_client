import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { UserContext } from './UserContext';
import { useContext } from 'react';


let menusStudent = [
  { name: "Ana sayfa", href: "#home" },
  { name: "Sınıflar", href: "#features" },
  { name: "Şikayet oluştur", href: "#pricing" },
  { name: "Sınavlar", href: "#features" },
  { name: "Çıkış yap", href: "#logout" }
];
let menusInstructor = [
  { name: "Ana sayfa", href: "#home" },
  { name: "Sınıflar", href: "#features" },
  { name: "Şikayet oluştur", href: "#pricing" },
  { name: "instructor", href: "#features" },
  { name: "Çıkış yap", href: "#logout" }
];


const Navbarx = () => {
  const { userType } = useContext(UserContext); 
  console.log(userType)
  const menus = userType === "student" ? menusStudent : menusInstructor;
  return (
    <Navbar bg="light" data-bs-theme="light" fixed='top'>
      <Container>
        <Navbar.Brand href="#home">
          <Image 
            src="/tu_logo.jpg" 
            roundedCircle
            width={70} 
          />
        </Navbar.Brand>
        <Nav className="ms-auto justify-content-around w-100 gap-3">
          {menus.map((menu, index) => (
            <Nav.Link key={index} href={menu.href} className="nav-link">
              {menu.name}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navbarx;
