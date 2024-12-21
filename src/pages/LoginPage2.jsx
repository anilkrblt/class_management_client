import React from 'react';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';

const LoginScreen = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
        <div className='d-flex justify-content-center mb-1'>
          <Image src='./tu_logo.jpg' roundedCircle width={100}/>
        </div>
        
        <h2 className='text-center' style={{color:" #233E90"}}>Sınıf Yönetim Sistemi</h2>
          <Card className="p-4 shadow-sm rounded-4 mb-5">
            <Card.Body>
              <h2 className="text-center mb-4">Giriş Yap</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>E-posta</Form.Label>
                  <Form.Control type="email" placeholder="E-posta adresinizi girin" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control type="password" placeholder="Şifrenizi girin" />
                </Form.Group>

                <Form.Group className="mb-3"  controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Beni hatırla" className='custom-checkbox'/>
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