import React from 'react';
import {Container,  Row, Col, Card,  Dropdown, DropdownButton } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';

const Classes = () => {
    const cards = [
        { id: 1, title: "D201", text: "Ders işleniyor", text2: "Mukavemet" },
        { id: 2, title: "D305", text: "Ders işleniyor", text2: "Bilgisayar Ağları" },
        { id: 2, title: "D204", text: "Sınıf kapalı" },
        { id: 3, title: "D104", text: "Boş" },
        { id: 1, title: "D201", text: "Ders işleniyor", text2: "Matematik 2" },
    ];
 

    return  <Container style={{ width: "45rem" }}>
            <Row className='my-4'>
                <Col>
                    <DropdownButton
                        title="Tüm sınıflar"
                    >
                        <Dropdown.Item eventKey="1">Derslikler</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Laboratuvarlar</Dropdown.Item>
                    </DropdownButton>
                </Col>


                <Col>
                    <Row>
                        <Col md={10}>
                            <Form.Control
                                type="text"
                                placeholder="Sınıf ara"
                                style={{ borderRadius: '15px' }} />
                        </Col>
                        <Col
                            className='my-1'
                            md={2}><Icon.Funnel size={28} /></Col>

                    </Row>

                </Col>
            </Row>

            <Row>

                {cards.map((card) => (
                    <Col key={card.id} md={6} className="mb-4">
                        <Card className='py-3' >
                            <Card.Body >
                                <Card.Title className='fw-bold'>{card.title}</Card.Title>
                                <Card.Text className='text-muted fw-light fw-bold'>{card.text}</Card.Text>
                                <Card.Text className='fw-bolder'>{card.text2}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
}

export default Classes