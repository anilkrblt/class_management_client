import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Image, Modal, Row, Button, Form, Alert } from "react-bootstrap";
import ClassesList from "./ClassesList";
import ClassCalendarStudent from "./ClassCalendarStudent";
import ClubEventCreateCalendar from "./ClubEventCreateCalendar";
import moment from 'moment';
import 'moment/locale/tr';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

moment.locale('tr');

const events = [
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Python etkinliği", eventLink: "https://www.google.com/", eventsDetails: "Bu etkinlikte Python hakkında temel bilgiler verilecektir." },
    { clubName: "IEEE", clubLogo: "/ieee.png", eventsDate: "20 Aralık Cuma 12:00", eventsPlace: "L208", eventsName: "Veri Bilimi", eventsDetails: "Veri bilimi projelerine giriş.", eventLink: "https://www.example.com/" },
    // Daha fazla etkinlik...
];

const ClubEvents = () => {
    const { userType } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

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
            setSelectedImage(URL.createObjectURL(file));
        }
    };


    const handleSaveNewEvent = () => {
        setShowAlert(false)
        console.log(selectedCard);

        if (newEvent.eventsName &&
            selectedTime &&
            selectedCard?.title &&
            newEvent.eventsDetails &&
            newEvent.eventsLink
        ) {
            const updatedEvent = {
                eventsName: newEvent.eventsName,  // Önceki değeri koruyoruz.
                eventsDate: selectedTime?.start,
                eventsPlace: selectedCard?.title ,  // Eğer selectedCard boşsa boş bir string atayın.
                eventsDetails: newEvent.eventsDetails,
                eventsLink: newEvent.eventsLink,
                eventsImage: selectedImage || ''  // Eğer resim seçilmemişse boş bir string atayın.
            };

            setNewEvent(updatedEvent)
            console.log(updatedEvent)
            //updatedevent admine gönderilecek
        }

        else setShowAlert(true);


       // setShowNewEventModal(false);
    };



    const [selectedCard, setSelectedCard] = useState(null);


    const start = moment(selectedTime?.start).format('DD MMMM dddd HH:mm'); // 19 Aralık Perşembe 05:00
    const end = moment(selectedTime?.end).format('HH:mm'); // 07:30

    const formattedDate = `${start} - ${end}`;

    const navigate = useNavigate();

    return (
        <Container className="bg-light rounded-4">
            <Row className="justify-content-start align-items-center">
                <Col md="auto"><h3 className="sticky-top bg-light">Henüz gerçekleşmeyen kulüp etkinlikleri</h3></Col>
                <Col md="auto"><Button variant="outline-success" onClick={handleShowNewEventModal}>Yeni etkinlik oluştur</Button></Col>
              {userType === "admin" &&
              <Col md="auto"><Button variant="outline-success" onClick={()=>{navigate("/kulüpler-rezervasyon")}}>Etkinlik İstekleri</Button></Col>
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
                                            className="d-flex twinkle-star-regular"
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

            {selectedEvent && (
                <Modal size="xl" show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{<Image src={selectedEvent.clubLogo} style={{ width: "80px" }} />}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Etkinlik adı:</strong> {selectedEvent.eventsName}</p>
                        <p><strong>Tarih:</strong> {selectedEvent.eventsDate}</p>
                        <p><strong>Yer:</strong> {selectedEvent.eventsPlace}</p>
                        <Row>
                            <Col md="auto">
                                <Image src='/ieee_afis.jpg' width={300} />
                            </Col>
                            <Col >  <p><strong>Davet metni: </strong>Türkiye, resmî adıyla Türkiye Cumhuriyeti, topraklarının büyük bölümü Batı Asya'da Anadolu'da, diğer bir bölümü ise Güneydoğu Avrupa'nın uzantısı Doğu Trakya'da olan kıtalararası bir ülkedir. Batıda Bulgaristan ve Yunanistan, doğuda Gürcistan, Ermenistan, İran ve Azerbaycan, güneyde ise Irak ve Suriye ile sınır komşusudur. Güneyini Kıbrıs ve Akdeniz, batısını Ege Denizi, kuzeyini ise Karadeniz çevreler. Marmara Denizi ise İstanbul Boğazı ve Çanakkale Boğazı ile birlikte Anadolu'yu Trakya'dan, yani Asya'yı Avrupa'dan ayırır. Resmî olarak laik bir devlet olan Türkiye'de nüfusun çoğunluğu Müslüman'dır. Ankara, Türkiye'nin başkenti ve ikinci en kalabalık şehri; İstanbul ise, Türkiye'nin en kalabalık şehri, ekonomik ve finansal merkezi ve aynı zamanda Avrupa'nın en kalabalık şehridir.</p></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedEvent.eventLink && (
                            <Button
                                variant="success"
                                onClick={() => handleOpenLink(selectedEvent.eventLink)}
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
                                Lütfen tüm alanları doldurduğunuzdan emin olun!
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
                            <Col md={3}><strong>Yer: </strong>{selectedCard?.title}</Col>
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
                                <Col md={3}> <Form.Label><strong>Etkinlik afişi:</strong></Form.Label></Col>
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
                <Row>
                    <Col md={6} className="scrollable"> <ClassesList setSelectedCard={setSelectedCard} /></Col>
                    <Col md={6}> <ClubEventCreateCalendar setSelectedTime={setSelectedTime} /> </Col>
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

        </Container>
    );
};

export default ClubEvents;
