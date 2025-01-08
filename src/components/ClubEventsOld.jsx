import { useState } from "react";
import { Card, Col, Container, Image, Modal, Row, Button } from "react-bootstrap";
import "moment/locale/tr";
import moment from "moment";
import { baseUrl2 } from "../utils/ClubEventApiService";
moment.locale('tr');

const ClubEventsOld = ({ events }) => {
    const formatDate = (dateString) => {
        return moment(dateString, "DD.MM.YYYY").format("D MMMM dddd");
    };

    function getStartTime(eventTime) {
        const startTime = eventTime.split(' - ')[0]; // Başlangıç saatini ayır
        return moment(startTime, "HH:mm:ss").format("HH:mm"); // Formatla ve döndür
    }
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
                                    <Image src={`${baseUrl2}${event.clubLogo}`} style={{ width: "80px" }} />
                                </Col>
                                <Col className="d-flex align-items-center">{event.clubName}</Col>
                            </Row>
                            <Card.Body>
                                <Row>
                                    <Col md={3} className="fw-bold fs-2 d-flex align-items-center border-end">
                                        {event.clubRoomName}
                                    </Col>
                                    <Col md={9}>
                                        <div className="twinkle-star-regular text-center">{formatDate(event.eventDate)} {getStartTime(event.eventTime)}</div>
                                        <div
                                            className="twinkle-star-regular"
                                            style={{
                                                fontSize:
                                                    event.title.length <= 22
                                                        ? "30px"
                                                        : event.title.length <= 30
                                                            ? "20px"
                                                            : "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {event.title}
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
