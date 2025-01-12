import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { ListGroup, Card, Container, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Col, Row } from "react-bootstrap";
import "moment/locale/tr";
import moment from "moment";
import { updateComplaint } from '../utils/ComplaintApiService';
import { closeRoom } from '../utils/RoomApiService';
moment.locale('tr');

const ComplaintsNew = ({ complaints }) => {
    const [show, setShow] = useState(false);
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseText, setResponseText] = useState("");

    function formatToInitials(str) {
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

        const words = str.split(' ');

        const initials = words.map(word => {
            const firstChar = word.charAt(0).toLowerCase();
            return map[firstChar] || firstChar;
        }).join('');

        return initials;
    }

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setShow(true);
    };

    const handleClose = async () => {

        try {
            await closeRoom(selectedComplaint.roomName)
        } catch (error) {
            alert("hata")
        }
    };

    const handleResolveComplaint = () => {
        setShowResolveModal(true);
    }

    const handleResolveClose = () => {
        setShowResolveModal(false);
        setResponseText("");
    }

    const handleResponseChange = (e) => {
        setResponseText(e.target.value);
    }

    const handleSubmitResponse = async () => {
        const data = { status: "approved", solveDescription: responseText }
        const id = selectedComplaint.requestId
        console.log(data)
        try {
            await updateComplaint(id, data)
            setShow(false)
        } catch (error) {
            alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.")
        }
        handleResolveClose();
    }

    return (
        <Container className="bg-light rounded-4 ps-2 " >
            <h2 className="my-3 text-center sticky-top bg-light py-1" style={{ zIndex: 10 }}>Şikayetler</h2>

            {complaints.length === 0
                ? <p className='text-center  fw-semibold'>Şu anda çözüm bekleyen şikayet bulunmamaktadır.</p>
                : <ListGroup className="ms-1 ">
                    {complaints.map((item, index) => (
                        <Card
                            key={index}
                            className="py-2 ps-2 my-1"
                            style={{
                                backgroundColor: index % 2 === 0 ? "#edfaf9" : "white",
                            }}
                        >
                            <Row className=" d-flex align-items-center justify-content-around w-100' ">
                                <Col md={1}>
                                    <Image
                                        src={`https://cdn.auth0.com/avatars/${formatToInitials(item.userName)}.png`} // İlk harflerden oluşan URL
                                        roundedCircle
                                        width={50}
                                        className="me-3"
                                    />
                                </Col>
                                <Col md={4} className='ms-2'>
                                    <div>
                                        <Card.Title className="text-start">{item.userName}</Card.Title>
                                        <Card.Text className="text-start">
                                            {item.type}
                                        </Card.Text>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <h3>{item.roomName}</h3>
                                </Col>
                                <Col md={2}>
                                    <Col className="fs-4 fw-bold ms-2">{moment(item.createdAt).date()}</Col>
                                    <Col className="fs-5 text-secondary"> {moment(item.createdAt).format("MMMM")}</Col>
                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" onClick={() => handleShow(item)}>İncele</Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </ListGroup>
            }
            {/* Şikayet Detay Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Şikayet Detayları</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <>
                            <p><strong>Adı Soyadı: </strong>{selectedComplaint.userName}</p>
                            <p><strong>Şikayet Türü: </strong>{selectedComplaint.type}</p>
                            <p><strong>Şikayet Başlığı: </strong>{selectedComplaint.title}</p>
                            <p><strong>Şikayet Yeri: </strong>{selectedComplaint.roomName}</p>
                            <p><strong>Şikayet Tarihi: </strong>{moment(selectedComplaint.createdAt).format("DD MMMM YYYY HH:mm")}</p>
                            <p><strong>Şikayet Açıklaması: </strong>{selectedComplaint.content}</p>
                            <p><strong>Fotoğraflar: </strong></p><Image src={selectedComplaint.photos} />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleClose()}>
                        {selectedComplaint && (selectedComplaint.roomName)} sınıfını kapat
                    </Button>
                    <Button onClick={handleResolveComplaint}>
                        Şikayeti çöz
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Şikayet Çözüm Modal */}
            <Modal show={showResolveModal} onHide={handleResolveClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Şikayete Geri Dönüş</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <textarea
                        value={responseText}
                        onChange={handleResponseChange}
                        className="form-control"
                        rows="5"
                        placeholder="Şikayet hakkında geri dönüş yazınız."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleResolveClose}>
                        İptal
                    </Button>
                    <Button onClick={handleSubmitResponse}>
                        Geri Dönüşü Gönder
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ComplaintsNew;
