import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Image, Modal, Row, Button, Form, Alert } from "react-bootstrap";
import ClassesList from "./ClassesList";
import ClassCalendarStudent from "./ClassCalendarStudent";
import ClubEventCreateCalendar from "./ClubEventCreateCalendar";
import moment from 'moment';
import 'moment/locale/tr';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "moment/locale/tr";
import * as Icon from 'react-bootstrap-icons';
import { baseUrl, baseUrl2, createClubEvent } from "../utils/ClubEventApiService";
import axios from "axios";
moment.locale('tr');


const ClubEvents = ({ events }) => {
    const { userType } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const formData = new FormData();

    const [selectedTime, setSelectedTime] = useState(null)
    const [newEvent, setNewEvent] = useState({
        eventsName: '',
        eventsDate: '',
        eventsPlace: '',
        eventsDetails: '',
        eventsLink: '',
        eventsImage: ''
    });


    const handleShowModal = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };




    const handleClose = () => setShowModal2(false);


    const handleOpenLink = (link) => {
        window.open(link, "_blank", "noopener,noreferrer");
    };

    const handleShowNewEventModal = () => {
        setShowNewEventModal(true);
    };

    const handleCloseNewEventModal = () => {
        setShowNewEventModal(false);


    };

    const handleNewEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); // Önizleme için URL oluşturuluyor
            setPreviewImage(URL.createObjectURL(file));
        }
    };


    const handleSaveNewEvent = async () => {
        setShowAlert(false)
        console.log(selectedCard);

        if (newEvent.eventsName &&
            selectedTime &&
            selectedCard?.name &&
            newEvent.eventsDetails

        ) {
            console.log(selectedTime)
            const selectedDate = new Date(selectedTime.start);
            const selectedEnd = new Date(selectedTime.end);

            const formattedDate = moment(selectedDate).toISOString();
            const start = moment(selectedDate).format('HH:mm:ss');
            const end = moment(selectedEnd).format('HH:mm:ss');



            const updatedEvent = {
                studentId: 3,
                clubName: "Robotics Club",
                roomName: selectedCard.name,
                startTime: start,
                endTime: end,
                eventTime: formattedDate,
                title: newEvent.eventsName,
                details: newEvent.eventsDetails,
                link: newEvent.eventsLink,
                banner: selectedImage,
                status: "pending",

            };

            // FormData oluşturma
            const formData = new FormData();
            formData.append("StudentId", 3);
            formData.append("ClubName", "Robotics Club");
            formData.append("RoomName", selectedCard.name);
            formData.append("StartTime", start);
            formData.append("EndTime", end);
            formData.append("EventTime", formattedDate);
            formData.append("Title", newEvent.eventsDetails);
            formData.append("Details", newEvent.eventsDetails);
            formData.append("Link", newEvent.eventsLink || ""); // Link opsiyonel olabilir
            formData.append("Status", "pending");

            // Eğer bir dosya seçildiyse FormData'ya ekle
            if (selectedImage) {
                formData.append("BannerFile", selectedImage); // Backend ile aynı isimde olmalı
            }
            console.log(previewImage)
            try {
                // Axios ile POST isteği
                const response = await axios.post(
                    "http://localhost:5132/api/reservations/clubreservation",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log("Başarılı:", response.data);
                setShowNewEventModal(false);
                setShowModal2(true);
            } catch (error) {
                console.error("Bir hata oluştu:", error);
                alert("Bir hata oluştu.");
            }


            try {
                //await createClubEvent(updatedEvent)
                setShowNewEventModal(false)
                setShowModal2(true)
            } catch (error) {
                alert("Bir hata oluştu.")
            }
            setNewEvent(updatedEvent)

        }

        else setShowAlert(true);


        // setShowNewEventModal(false);
    };



    const [selectedCard, setSelectedCard] = useState(null);


    const start = moment(selectedTime?.start).format('DD MMMM dddd HH:mm'); // 19 Aralık Perşembe 05:00
    const end = moment(selectedTime?.end).format('HH:mm'); // 07:30

    const formattedDate = selectedTime
        ? `${moment(selectedTime?.start).format('DD MMMM dddd HH:mm')} - ${moment(selectedTime?.end).format('HH:mm')}`
        : '';  // Eğer selectedTime boşsa, boş bir string döndür

    const navigate = useNavigate();


    const formatDate = (dateString) => {
        return moment(dateString, "DD.MM.YYYY").format("D MMMM dddd");
    };

    function getStartTime(eventTime) {
        const startTime = eventTime.split(' - ')[0]; // Başlangıç saatini ayır
        return moment(startTime, "HH:mm:ss").format("HH:mm"); // Formatla ve döndür
    }

    function getEndTime(eventTime) {
        const endTime = eventTime.split(' - ')[1]; // Bitiş saatini ayır
        return moment(endTime, "HH:mm:ss").format("HH:mm"); // Formatla ve döndür
    }

    function formatEventTime(eventTime) {
        const [startTime, endTime] = eventTime.split(' - '); // Zamanı ayır
        const formattedStart = moment(startTime, "HH:mm:ss").format("HH:mm"); // Başlangıç zamanını formatla
        const formattedEnd = moment(endTime, "HH:mm:ss").format("HH:mm"); // Bitiş zamanını formatla
        return `${formattedStart} - ${formattedEnd}`; // Formatlanmış zamanları birleştir
    }
    console.log(selectedCard)
    return (
        <Container className="bg-light rounded-4 p-1 ps-3">
            <Row className="justify-content-start align-items-center">
                <Col md="auto"><h3 className="sticky-top bg-light">Henüz Gerçekleşmeyen Kulüp Etkinlikleri</h3></Col>
                <Col md="auto"><Button variant="outline-success" onClick={handleShowNewEventModal}>Yeni etkinlik oluştur</Button></Col>
                {userType === "admin" &&
                    <Col md="auto"><Button variant="outline-success" onClick={() => { navigate("/kulüpler-rezervasyon") }}>Etkinlik İstekleri</Button></Col>
                }
            </Row>

            <Row>
                {events.length === 0 && <p className="text-center fw-semibold mt-3">Yakında gerçekleşecek etkinlik bulunmamakta.</p>}
                {events.map((event, index) => (
                    <Col md={4} key={index}>
                        <Card
                            className="mb-3 mt-2"
                            style={{ height: "19vh", cursor: "pointer" }}
                            onClick={() => handleShowModal(event)}
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
                                            className="d-flex twinkle-star-regular"
                                            style={{
                                                fontSize:
                                                    event.title.length <= 22
                                                        ? "1.4wv"
                                                        : event.title.length <= 30
                                                            ? "1.4wv"
                                                            : "1.4wv",
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

            {selectedEvent && (
                <Modal size="xl" show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{<Image src={`${baseUrl2}${selectedEvent.clubLogo}`} style={{ width: "80px" }} />}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Etkinlik adı:</strong> {selectedEvent.title}</p>
                        <p><strong>Tarih ve saat:</strong> {formatDate(selectedEvent.eventDate)}{" "}{formatEventTime(selectedEvent.eventTime)}</p>
                        <p><strong>Yer:</strong> {selectedEvent.clubRoomName}</p>
                        <Row>
                            <Col md="auto">
                                <Image src={`${baseUrl2}${selectedEvent.banner}`} width={300} />
                            </Col>
                            <Col >  <p><strong>Davet metni: </strong>{selectedEvent.details}</p></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedEvent.katilimLinki && (
                            <Button
                                variant="success"
                                onClick={() => handleOpenLink(selectedEvent.katilimLinki)}
                            >
                                Etkinliğe Katılım Formu
                            </Button>
                        )}
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Kapat
                        </Button>
                    </Modal.Footer>
                </Modal>

            )}

            <Modal size="xl" show={showNewEventModal} onHide={handleCloseNewEventModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Etkinlik Oluştur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {showAlert && (
                            <Alert variant="danger">
                                Lütfen tüm zorunlu alanları doldurduğunuzdan emin olun!
                            </Alert>
                        )}
                        <Row className="align-items-center">
                            <Col md={3}><p><strong>Kulübünüzün adı: </strong>IEEE</p></Col>
                            <Col md={6}>
                                <Form.Group controlId="formEventName" >
                                    <Row className="align-items-center">
                                        <Col md="auto" >
                                            <Form.Label ><strong>Etkinlik adı:</strong></Form.Label>
                                        </Col>
                                        <Col md={7}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Etkinlik adı girin"
                                                name="eventsName"
                                                value={newEvent.eventsName}
                                                onChange={handleNewEventChange}
                                            />
                                        </Col>
                                    </Row>

                                </Form.Group>
                            </Col>
                            <Col md={3}><strong>Yer: </strong>{selectedCard?.name}</Col>
                        </Row>

                        <Row className="align-items-center mt-2">
                            <Col><Form.Group controlId="formEventLink" >
                                <Row className="align-items-center">
                                    <Col md="auto" >
                                        <Form.Label ><strong>Etkinlik katılım formu linki:</strong></Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Linki yapıştırın"
                                            name="eventsLink"
                                            className=""
                                            value={newEvent.eventsLink}
                                            onChange={handleNewEventChange}
                                        />
                                    </Col>


                                </Row>

                            </Form.Group></Col>

                            <Col md={4}><strong>Tarih ve saat: </strong> {formattedDate}</Col>
                        </Row>


                        <Form.Group controlId="formEventDetails">
                            <Form.Label><strong>Davet metni:</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Etkinlik detayları"
                                name="eventsDetails"
                                value={newEvent.eventsDetails}
                                onChange={handleNewEventChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEventImage">
                            <Row className="d-flex justify-content-start w-50 align-items-center mt-2">
                                <Col md={3}> <Form.Label><strong>Etkinlik afişi: (Zorunlu değil)</strong></Form.Label></Col>
                                <Col md={9}> <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                /></Col>
                            </Row>


                            {selectedImage && (
                                <div className="mt-3">
                                    <img
                                        src={selectedImage}
                                        alt="Afiş Önizleme"
                                        style={{ width: "150px", height: "auto", borderRadius: "8px" }}
                                    />
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Row className="px-1">
                    <Col md={6} className="scrollable"> <ClassesList setSelectedCard={setSelectedCard} /></Col>
                    <Col md={6}> <ClubEventCreateCalendar setSelectedTime={setSelectedTime} selectedCard={selectedCard} /> </Col>
                </Row>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNewEventModal}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={handleSaveNewEvent}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Bilgi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className=" justify-content-start align-items-center ps-5">
                        <Col md={3}>
                            <Icon.CheckCircleFill fill="#198754" size={80} />
                        </Col>
                        <Col md={7}>
                            <h5>Talebiniz bize ulaşmıştır.</h5>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ClubEvents;
