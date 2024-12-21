import { useState } from "react";
import { Card, Col, Container, Image, Modal, Row, Button } from "react-bootstrap";

const events = [
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş." },
    // Daha fazla etkinlik...
];

const ClubEventsOld = () => {
   
    return (
        <Container className="bg-light rounded-4">
            <h3 className="sticky-top bg-light">Gerçekleşen kulüp etkinlikleri</h3>
            <Row>
                {events.map((event, index) => (
                    <Col md={4} key={index}>
                        <Card
                            className="mb-3"
                            style={{ height: "19vh", cursor: "pointer" }}
                        >
                            <Row className="ps-2">
                                <Col>
                                    <Image src="/ieee.png" style={{ width: "80px" }} />
                                </Col>
                                <Col className="d-flex align-items-center">{event.clubName}</Col>
                            </Row>
                            <Card.Body>
                                <Row>
                                    <Col md={3} className="fw-bold fs-2 d-flex align-items-center border-end">
                                        {event.eventsPlace}
                                    </Col>
                                    <Col md={9}>
                                        <div className="twinkle-star-regular text-center">{event.eventsDate}</div>
                                        <div
                                            className="twinkle-star-regular"
                                            style={{
                                                fontSize:
                                                    event.eventsName.length <= 22
                                                        ? "30px"
                                                        : event.eventsName.length <= 30
                                                        ? "20px"
                                                        : "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {event.eventsName}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

          
        </Container>
    );
};

export default ClubEventsOld;
