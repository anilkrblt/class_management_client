import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Container, Modal, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { getAllComplaints } from '../utils/ComplaintApiService';
import moment from 'moment';

const Complaints = () => {
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [complaints, setComplaints] = useState([])

    useEffect(() => {
        const fetchComplaints = async () => {
            const complaint = await getAllComplaints();
            setComplaints(complaint.filter((event) => event.status === "pending"))
        };

        fetchComplaints();
    }, []);

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedComplaint(null);
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


    return (
        <Container className="bg-light rounded-4 ps-2 ">
            <h2 className="my-3 text-center sticky-top bg-light py-1">Şikayetler</h2>
            {complaints.length === 0
                ? <p className='text-center  fw-semibold'>Şu anda çözüm bekleyen şikayet bulunmamaktadır.</p>
                : <ListGroup className="ms-1">
                    {complaints.map((item, index) => (
                        <Card
                            key={index}
                            className="my-1"
                            style={{ backgroundColor: index % 2 === 0 ? '#edfaf9' : 'white' }}
                        >
<Card.Body className="align-items-center">
    <Row className='d-flex justify-content-between'>
        <Col md={2} className="d-flex align-items-center">
            <Image
                src={`https://cdn.auth0.com/avatars/${formatToInitials(item.userName)}.png`}
                roundedCircle
                width={50}
                className="me-3"
            />
        </Col>
        <Col md={7} className='d-flex flex-column justify-content-between'>
            <Card.Title className="text-start">{item.userName}</Card.Title>
            <Card.Text className="text-start" >
                {item.content} - {item.roomName}
            </Card.Text>
        </Col>
        <Col md={3} className="d-flex align-items-center justify-content-center">
            <Button variant="danger" onClick={() => handleShow(item)}>
                İncele
            </Button>
        </Col>
    </Row>
</Card.Body>

                        </Card>
                    ))}
                </ListGroup>}

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Şikayet Detayları</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <>
                            <p><strong>Adı Soyadı: </strong>{selectedComplaint.userName}</p>
                            <p><strong>Şikayet Türü: </strong>{selectedComplaint.content}</p>
                            <p><strong>Şikayet Yeri: </strong>{selectedComplaint.roomName}</p>
                            <p><strong>Şikayet Tarihi: </strong>{moment(selectedComplaint.createdAt).format("DD MMMM YYYY HH:mm")}</p>
                            <p><strong>Şikayet Açıklaması: </strong>{selectedComplaint.content}</p>
                            <p><strong>Fotoğraflar: </strong></p><Image src={selectedComplaint.photos} />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        {selectedComplaint && (selectedComplaint.class)} sınıfını kapat
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Complaints;
