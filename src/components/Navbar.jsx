import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from './UserContext';
import { useContext, useState, useEffect, useRef } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

let menusStudent = [
  { name: "Ana sayfa", href: "/anasayfa", icon: <Icon.HouseDoorFill size={20} />, disableIcon: <Icon.HouseDoor /> },
  { name: "Sınıflar", href: "/sınıflar", icon: <Icon.Grid3x3GapFill size={20} />, disableIcon: <Icon.Grid3x3Gap /> },
  { name: "Ders programı", href: "/dersprogramı", icon: <Icon.Calendar2WeekFill size={20} />, disableIcon: <Icon.Calendar2Week /> },
  { name: "Kulüpler", href: "/kulüpler", icon: <Icon.LightningChargeFill size={20} />, disableIcon: <Icon.LightningCharge /> },
  { name: "Şikayet oluştur", href: "/şikayetoluştur", icon: <Icon.PencilFill size={20} />, disableIcon: <Icon.Pencil /> }
];

let menusInstructor = [
  { name: "Ana sayfa", href: "/anasayfa", icon: <Icon.HouseDoorFill size={20} />, disableIcon: <Icon.HouseDoor /> },
  { name: "Sınıflar", href: "/sınıflar", icon: <Icon.Grid3x3GapFill size={20} />, disableIcon: <Icon.Grid3x3Gap /> },
  { name: "Ders programı", href: "/dersprogrami", icon: <Icon.Calendar2WeekFill size={20} />, disableIcon: <Icon.Calendar2Week /> },
  { name: "Şikayet oluştur", href: "/şikayetoluştur", icon: <Icon.PencilFill size={20} />, disableIcon: <Icon.Pencil /> },
];

let menusAdmin = [
  { name: "Ana sayfa", href: "/anasayfa", icon: <Icon.HouseDoorFill size={20} />, disableIcon: <Icon.HouseDoor /> },
  { name: "Sınıflar", href: "/sınıflar", icon: <Icon.Grid3x3GapFill size={20} />, disableIcon: <Icon.Grid3x3Gap /> },
  { name: "Ders programı", href: "/dersprogrami", icon: <Icon.Calendar2WeekFill size={20} />, disableIcon: <Icon.Calendar2Week /> },
  { name: "Dersler", href: "/dersler", icon: <Icon.LayersFill size={20} />, disableIcon: <Icon.Layers /> },
  { name: "Sınıf yönetimi", href: "/sınıfyonetimi", icon: <Icon.ClipboardCheckFill size={20} />, disableIcon: <Icon.ClipboardCheck />},
  { name: "Sınavlar", href: "/sınavolustur", icon: <Icon.ClipboardCheckFill size={20} />, disableIcon: <Icon.ClipboardCheck />},
  { name: "Kulüpler", href: "/kulüpler", icon: <Icon.LightningChargeFill size={20} />, disableIcon: <Icon.LightningCharge /> },
  { name: "Şikayetler", href: "/şikayetler", icon: <Icon.PencilFill size={20} />, disableIcon: <Icon.Pencil />  },
];

const Navbarx = () => {
  const { userType, setUserType, setUserId, setUserName, userName, notifications, setNotifications } = useContext(UserContext);
  const menus =
    userType === "admin"
      ? menusAdmin
      : userType === "instructor"
        ? menusInstructor
        : menusStudent;

  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
console.log(notifications)
  const notificationsa = [];
console.log(JSON.stringify(notifications, null, 2))
  // Referans tanımlıyoruz
  const notificationRef = useRef(null);

  // Kartın dışına tıklanırsa kapanması için olay dinleyici
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType'); // Kullanıcı türünü temizle
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    setUserType(null); 
    setUserName(null)
    setUserId(null)
    setNotifications(null)
    navigate("/giris")
  };

  // İkonlar Dizisi
  const iconMenus = [
    {
      icon: <Icon.Bell size={20}/>,
      disableIcon: <Icon.BellFill/>,
      action: () => setShowNotifications(!showNotifications) // Bildirimleri göster
    },
    {
      icon: <><Icon.Person size={23}/> <span className='align-items-center'>      {userName}</span></>,
      disableIcon: <Icon.PersonFill size={30}/>,
      action: () => navigate("/profil") // Profil
    },
    {
      icon: <Icon.BoxArrowRight size={23} className='logout'/>,
      action: () => handleLogout() // Çıkış yap
    }
  ];

  return (
    <Navbar bg="light" data-bs-theme="light" fixed="top" expand="lg" className='shadow-sm'>
      <Container>
  
        <Navbar.Brand href="/anasayfa">
          <Image
            src="/tu_logo.jpg"
            roundedCircle
            width={70}
            style={{ cursor: "pointer" }} // Tıklanabilir olduğunu göstermek için
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto justify-content-around w-100 gap-3">
            {menus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.href}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {({ isActive }) => (
                  <div className='align-items-center d-flex'>
                    {isActive ? menu.icon : menu.disableIcon}
                    <span className='ms-1'>{menu.name}</span>
                  </div>
                )}
              </NavLink>
            ))}
            {/* İkonlar */}
            <Nav>
              {iconMenus.map((menu, index) => (
                <div key={index} className="position-relative">
                  <Nav.Link onClick={menu.action}>
                    {menu.icon}
                  </Nav.Link>
                  {index === 0 && showNotifications && (
                    <Card
                      ref={notificationRef}
                      className="position-absolute top-100 end-0"
                      style={{ width: '30rem', zIndex: 10 }}
                    >
                      <Card.Header>Bildirimler</Card.Header>
                      <ListGroup variant="flush">
                        {notifications.length > 0 ? (
                          notifications.map((notification, idx) => (
                            <ListGroup.Item key={idx}>{notification?.title}</ListGroup.Item>
                          ))
                        ) : (
                          <ListGroup.Item>Hiç bildirim yok</ListGroup.Item>
                        )}
                      </ListGroup>
                    </Card>
                  )}
                </div>
              ))}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarx;
