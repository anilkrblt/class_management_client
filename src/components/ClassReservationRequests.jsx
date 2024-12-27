import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Modal, Image } from 'react-bootstrap';
import { getAllClubEvents } from '../utils/ClubEventApiService';
import moment from 'moment';
import "moment/locale/tr";
moment.locale('tr');

const ClassReservationRequests = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await getAllClubEvents();
            setRequests(events.filter((event) => event.status === "pending"))

        };
        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        return moment(dateString, "DD.MM.YYYY").format("D MMMM dddd");
    };


    function formatToInitials(str) {
        // Türkçe harfleri doğru şekilde dönüştürmek için harf dönüşümü
        const map = {
            'ç': 'c',
            'ğ': 'g',
            'ı': 'i',
            'İ': 'I',
            'ö': 'o',
            'ş': 's',
            'ü': 'u',
            'Ç': 'c',
            'Ö': 'o',
            'Ş': 's',
            'Ğ': 'g',
            'Ü': 'u',
        };

        // Kelimeleri boşluktan ayırıyoruz
        const words = str.split(' ');

        // İlk harfleri alıp küçük yaparak dönüştürme
        const initials = words.map(word => {
            const firstChar = word.charAt(0).toLowerCase(); // İlk harfi alıyoruz
            return map[firstChar] || firstChar; // Türkçe harfler için dönüşüm yapıyoruz
        }).join('');

        return initials;
    }

    const handleShowModal = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    const handleRequestAction = (request) => {
        setRequests((prevRequests) =>
            prevRequests.filter((item) => item !== request)
        );
        setShowModal(false);
    };

    return (
        <Container className='rounded-4 bg-light pb-2'>
            <h2 className="my-3 text-center sticky-top bg-light" style={{ zIndex: 10 }}>Kulüp Rezervasyon İstekleri</h2>
            {requests.length > 0 ? (
                requests.map((item, index) => (
                    <Card
                        key={index}
                        className="my-2 ps-5"
                        style={{ backgroundColor: index % 2 === 0 ? '#fff9ed' : 'white' }}
                    >
                        <Row className="d-flex align-items-center justify-content-between w-100">
                            <Col md={1}>
                                <Image
                                    src={`https://cdn.auth0.com/avatars/${formatToInitials(item.fullName)}.png`} // İlk harflerden oluşan URL
                                    roundedCircle
                                    width={50}
                                    className="me-3"
                                />
                            </Col>
                            <Col md={3}>
                                <Container className="pt-2">
                                    <h5>{item.fullName}</h5>
                                    <p>{item.clubName}</p>
                                </Container>
                            </Col>
                            <Col md={2}>
                                <h3>{item.clubRoomName}</h3>
                            </Col>
                            <Col md={1}>
                                <Col className="fs-4 fw-bold ms-2">{moment(item.eventDate, "DD.MM.YYYY").date()}</Col>
                                <Col className="fs-5 text-secondary"> {moment(item.eventDate, "DD.MM.YYYY").format("MMMM")}</Col>
                            </Col>
                            <Col md={2}>
                                <h5>13:00 - 15:00</h5>
                            </Col>
                            <Col md={3}>
                                <Row>
                                    <Col>
                                        <Button variant="secondary" onClick={() => handleShowModal(item)}>
                                            İncele
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="success" onClick={() => handleRequestAction(item)}>
                                            Onayla
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={() => handleRequestAction(item)}>
                                            Reddet
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                ))
            ) : (
                <p className="text-center">Şu anda hiç sınıf rezervasyon isteği yok.</p>
            )}

            {/* Modal */}
            {selectedRequest && (
                <Modal size='xl' show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Rezervasyon Detayları <Image src='/ieee.png' width={80} /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Row>
                                    <p><strong>Kulüp: </strong>{selectedRequest.clubName}</p>

                                </Row>

                                <p><strong>Ad soyad:</strong> {selectedRequest.fullName}</p>
                                <p><strong>Öğrenci no: </strong>{selectedRequest.studentNo} </p>
                                <p><strong>Bölümü: </strong>Elektrik-Elektronik Mühendisliği</p>


                            </Col>
                            <Col>
                                <p><strong>Yer: </strong>{selectedRequest.clubRoomName}</p>
                                <p><strong>Tarih saat: </strong>{formatDate(selectedRequest.eventDate)}</p>
                                <p><strong>Etkinlik adı: </strong>{selectedRequest.title}</p>
                                <p><strong>Katılım formu: </strong>
                                    <Button
                                        variant="link"
                                        onClick={() => window.open(selectedRequest.katilimLinki, '_blank', 'noopener,noreferrer')}
                                    >
                                        Formu Aç
                                    </Button></p>
                            </Col>
                        </Row>
                        <Row>
                            {selectedRequest.banner && <Col md="auto">
                                <Image src={selectedRequest.banner} width={260} />
                            </Col>}

                            <Col >  <p><strong>Davet metni: </strong>{selectedRequest.details}</p></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => handleRequestAction(selectedRequest)}>Onayla</Button>
                        <Button variant="danger" onClick={() => handleRequestAction(selectedRequest)}>Reddet</Button>
                        <Button variant="secondary" onClick={handleCloseModal}>Kapat</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default ClassReservationRequests;
