import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Container, Modal, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { getAllComplaints } from '../utils/ComplaintApiService';
import moment from 'moment';
import * as Icon from 'react-bootstrap-icons';
import { baseUrl2, changeRequest, getAllClubEvents } from '../utils/ClubEventApiService';

const ClubRequestHomepage = () => {
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

    const handleRequestAccepted = async (request) => {
        try {
            const reservationId = request.reservationId
            await changeRequest(reservationId, "approved")
            setRequests((prevRequests) =>
                prevRequests.filter((item) => item !== request)
            );
        } catch (error) {
            alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
        }

        setShowModal(false);
    };

    const handleRequestCanceled = async (request) => {
        try {
            const reservationId = request.reservationId
            await changeRequest(reservationId, "canceled")
            setRequests((prevRequests) =>
                prevRequests.filter((item) => item !== request)
            );
        } catch (error) {
            alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
        }

        setShowModal(false);
    };

    function formatEventTime(eventTime) {
        const [startTime, endTime] = eventTime.split(' - '); // Zamanı ayır
        const formattedStart = moment(startTime, "HH:mm:ss").format("HH:mm"); // Başlangıç zamanını formatla
        const formattedEnd = moment(endTime, "HH:mm:ss").format("HH:mm"); // Bitiş zamanını formatla
        return `${formattedStart} - ${formattedEnd}`; // Formatlanmış zamanları birleştir
    }

    return (
        <Container className='rounded-4 bg-light pb-2'>
            <h3 className="my-3 text-center sticky-top bg-light" style={{ zIndex: 10 }}>Kulüp Rezervasyon İstekleri</h3>
            {requests.length > 0 ? (
                requests.map((item, index) => (
                    <Card
                        key={index}
                        className="my-2 ps-3 pb-1 d-flex justify-content-between"
                        style={{ backgroundColor: index % 2 === 0 ? '#fff9ed' : 'white' }}
                    >
                        <Row className="align-items-center">
                            <Col md={2}>
                                <Image
                                    src={`https://cdn.auth0.com/avatars/${formatToInitials(item.fullName)}.png`} // İlk harflerden oluşan URL
                                    roundedCircle
                                    width={50}
                                    className="me-3"
                                />
                            </Col>
                            <Col md={7}>
                                <Col className="pt-2">
                                    <h5>{item.fullName}</h5>
                                    <p>{item.clubName}</p>
                                </Col>
                            </Col>
                        
                           
                            <Col md={1}>
                                
                                    <Col>
                                        <Button variant="secondary" onClick={() => handleShowModal(item)}>
                                            İncele
                                        </Button>
                                    </Col>
                        
                            </Col>
                        </Row>
                        <Row>
                           
                            <Col md="auto"> <Icon.Building /> <span className='fw-semibold'>{item.clubRoomName}</span></Col>
                             <Col md="auto"><Icon.Calendar/> {formatDate(item.eventDate)}</Col>
                              <Col  md="auto"><Icon.Clock/> {formatEventTime(item.eventTime)}</Col>  </Row>
                    </Card>
                ))
            ) : (
                <p className="text-center fw-semibold">Şu anda hiç sınıf rezervasyon isteği yok.</p>
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
                                <p><strong>Tarih saat: </strong>{formatDate(selectedRequest.eventDate)} {formatEventTime(selectedRequest.eventTime)}</p>
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
                                <Image src={`${baseUrl2}${selectedRequest.banner}`} width={260} />
                            </Col>}

                            <Col >  <p><strong>Davet metni: </strong>{selectedRequest.details}</p></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => handleRequestAccepted(selectedRequest)}>Onayla</Button>
                        <Button variant="danger" onClick={() => handleRequestCanceled(selectedRequest)}>Reddet</Button>
                        <Button variant="secondary" onClick={handleCloseModal}>Kapat</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};
export default ClubRequestHomepage;
