import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Container, Modal, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { getAllComplaints, updateComplaint } from '../utils/ComplaintApiService';
import moment from 'moment';
import { closeRoom } from '../utils/RoomApiService';

const Complaints = () => {
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [complaints, setComplaints] = useState([])
const [responseText, setResponseText] = useState("");

    useEffect(() => {
        const fetchComplaints = async () => {
            const complaint = await getAllComplaints();
            setComplaints(complaint.filter((event) => event.status === "pending"))
        };

        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        const complaint = await getAllComplaints();
        setComplaints(complaint.filter((event) => event.status === "pending"))
    };

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
        setShow(false);
        
        setSelectedComplaint(null);
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
                fetchComplaints()
                setShow(false)
            } catch (error) {
                alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.")
            }
            handleResolveClose();
        }

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
                            <p>
                <strong>Fotoğraflar: </strong>
              </p>
              <div className="d-flex flex-wrap">
                {selectedComplaint.photos.split(",").map((photo, index) => (
                  <Image
                    key={index}
                    src={`http://localhost:5132/${photo}`}
                    alt={`Complaint Photo ${index + 1}`}
                    rounded
                    style={{
                      maxWidth: "150px",
                      margin: "10px",
                    }}
                  />
                ))}
              </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
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

export default Complaints;
