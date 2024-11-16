import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';


const ClassReservationRequests = () => {

    var requests = [
        { name: "Can Öztürk", exp: "Ek ders isteği", class: "L201", lesson: "Diferansiyel denklemler" },
        { name: "Zeynep Şentürk", exp: "Ek ders isteği", class: "D201" },
        { name: "Melih Yaşar", exp: "Ek ders isteği", class: "L208" },
        { name: "Sıla Yıldız", exp: "Kulüp toplantısı", class: "L104" },
        { name: "Ali Duru", exp: "Ek ders isteği", class: "D204" },
    ];

    return <Container >
        <h2 className="my-4 text-center">Sınıf rezervasyon istekleri</h2>
        {requests.map((item, index) => (
            <Card
                key={index}
                className='my-2 ps-5 '
                style={{ backgroundColor: index % 2 === 0 ? '#fff9ed' : 'white' }}>

                <Row className='d-flex align-items-center justify-content-between w-100'>

                    <Col md={3} className=""><Container className='pt-2'>
                        <h5>{item.name}</h5>
                        <p>{item.exp}</p>
                    </Container>   </Col>

                    <Col md={2} >
                        <h3>{item.class}</h3>
                    </Col>
                    <Col md={2} >
                        <Col className='fs-4 fw-bold ms-2'>15</Col>
                        <Col className='fs-5 text-secondary'>Kasım</Col>
                    </Col>

                    <Col md={2} >
                        <h5>13:00 - 15:00</h5>
                    </Col>

                    <Col md={2}>
                        <Row className=''>
                            <Col> <Button variant='success'>Onayla</Button></Col>
                            <Col> <Button variant='danger'>Reddet</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        ))}



    </Container>
}

export default ClassReservationRequests