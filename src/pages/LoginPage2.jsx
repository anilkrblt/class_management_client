import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Image, Alert } from 'react-bootstrap';
import { LoginApiService } from '../utils/LoginApiService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { Helmet } from 'react-helmet';
const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showAlert , setShowAlert] = useState(false)
  const [user, setUser] = useState(null); // user'ı başlangıçta null yapıyoruz
    const { userType, setUserType, setUserId, setNotifications, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function parseJwt(token) {
    if (!token) {
      console.error("Token bulunamadı!");
      return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));
    return JSON.parse(jsonPayload);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  
    try {
      const response = await LoginApiService(formData);
      if (response && response.token) {
        setUser(response); // response verisini set ediyoruz
        const tokenData = parseJwt(response.token);
        console.log(tokenData);
  
        const role = tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
        // response üzerinden gelen verilerle UserContext'i güncelliyoruz
        if (role.includes('Admin')) {
          setUserType('admin');
        } else {
          setUserType(role.toLowerCase());
        }
        
        setUserId(response.user.id); // user'ı doğrudan response'tan alıyoruz
        setUserName(response.user.instructorName || response.user.fullName);
        setNotifications(response.notifications); 
        console.log(response)
        navigate("/anasayfa");
      } else {
        console.error('Token bulunamadı');
      }
    } catch (error) {
      setShowAlert(true);
    }
  };
  

  return (
    
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Helmet>
            <title>Sınıf Yönetimi</title>
        </Helmet>
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className="d-flex justify-content-center mb-1">
            <Image
              src="https://upload.wikimedia.org/wikipedia/tr/1/14/Trakya_%C3%9Cniversitesi_logosu.jpg"
              roundedCircle
              width={100}
            />
          </div>

          <h2 className="text-center" style={{ color: '#233E90' }}>
            Sınıf Yönetim Sistemi
          </h2>
          <Card className="p-4 shadow rounded-4 mb-5">
            <Card.Body>
              <h2 className="text-center mb-4">Giriş Yap</h2>

              {showAlert && <Alert variant='danger'>E-posta veya şifre hatalı!</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>E-posta</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Şifrenizi girin"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

      
                <Button className="hover-effect w-100" type="submit">
                  Giriş Yap
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
