import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Dropdown, DropdownButton, Modal, Button, ProgressBar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import ClassCalendar from './ClassCalendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { UserContext } from './UserContext';
import ClassCalendarStudent from './ClassCalendarStudent';

const Classes = () => {

    const { userType } = useContext(UserContext);

    const [events, setEvents] = useState([
        {
            title: 'Toplantı',
            start: new Date(2024, 10, 20, 13, 0), // 14 Kasım 2024, 10:00
            end: new Date(2024, 10, 20, 15, 0),
            type: 'Ders',
        },
        {
            title: 'Bilgisayar mimarisi',
            start: new Date(2024, 10, 20, 16, 30), // 16 Aralık 2024, 13:30
            end: new Date(2024, 10, 20, 18, 0), // 16 Aralık 2024, 15:00
            type: 'Telafi dersi',
        },
    ]);

    const [date, setDate] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        capacity: '',
        projection: '',
        classType: ''
    });
    const [showAddLesson, setShowAddLesson] = useState(false); // Ek ders formunun görünürlüğü
    const [lessonDetails, setLessonDetails] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: 'Ek ders'

    });

    const cards = [
        { id: 1, title: "D201", text: "Ders işleniyor", text2: "Mukavemet", capacity: 40, projection: true, classType: "Derslik" },
        { id: 2, title: "D305", text: "Ders işleniyor", text2: "Bilgisayar Ağları", capacity: 35, projection: false, classType: "Derslik" },
        { id: 3, title: "D204", text: "Sınıf kapalı", capacity: 0, projection: false, classType: "Laboratuvar" },
        { id: 4, title: "D104", text: "Boş", capacity: 50, projection: true, classType: "Laboratuvar" },
        { id: 5, title: "D201", text: "Ders işleniyor", text2: "Matematik 2", capacity: 40, projection: true, classType: "Derslik" },

     
    ];

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCard(null);
        setLessonDetails({
            title: "",
            date: "",
            startTime: "",
            endTime: "",
            type: "Ek ders",
        });
        setShowAddLesson(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleAddLessonClick = () => setShowAddLesson(!showAddLesson);

    const handleLessonDetailsChange = (e) => {
        const { name, value } = e.target;
        setLessonDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Filtreli sınıflar
    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchTerm) &&
        (filterOptions.capacity ? card.capacity >= filterOptions.capacity : true) &&
        (filterOptions.projection ? card.projection === (filterOptions.projection === "true") : true) &&
        (filterOptions.classType ? card.classType === filterOptions.classType : true)
    );

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleShowFilterModal = () => setShowFilterModal(true);
    const handleCloseFilterModal = () => setShowFilterModal(false);

    const handleDataFromChild = (value) => {
        // Update the lessonDetails with the received data
        setLessonDetails({
            title: value.title,
            date: value.date,
            startTime: value.startTime,
            endTime: value.endTime,
            type: "Ek ders",

        });
    };

    const handleSaveLesson = () => {
        // Alanların boş olup olmadığını kontrol et
        if (!lessonDetails.title || !lessonDetails.date || !lessonDetails.startTime || !lessonDetails.endTime) {
            alert('Lütfen tüm alanları doldurunuz.');
            return;
        }

        // Başlangıç ve bitiş zamanlarını birleştir
        const start = new Date(`${lessonDetails.date}T${lessonDetails.startTime}`);
        const end = new Date(`${lessonDetails.date}T${lessonDetails.endTime}`);

        // Çakışma kontrolü
        const hasConflict = events.some(event => {
            return (
                (start >= event.start && start < event.end) || // Başlangıç zamanı başka bir etkinlik arasında mı?
                (end > event.start && end <= event.end) ||     // Bitiş zamanı başka bir etkinlik arasında mı?
                (start <= event.start && end >= event.end)     // Seçim tamamen başka bir etkinliği kapsıyor mu?
            );
        });

        if (hasConflict) {
            alert('Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.');
            return;
        }

        // Yeni etkinlik oluştur
        const newEvent = {
            title: lessonDetails.title,
            start,
            end,
            type: 'Ek ders',
        };

        // Yeni etkinliği events array'ine ekle
        setEvents(prevEvents => [...prevEvents, newEvent]);

        // Ders detaylarını sıfırla
        setLessonDetails({
            title: "",
            date: "",
            startTime: "",
            endTime: "",
            type: "Ek ders",
        });

        setShowAddLesson(false);

        console.log('Ek ders bilgileri:', lessonDetails);
    };



    return (
        <Container style={{ width: "45rem" }} className=' bg-light'>

            <Row className="bg-light mb-3 py-2 " style={{position:"sticky", top:0, zIndex:100}}>
                <Col>
                    <DropdownButton title="Tüm sınıflar">
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
                                style={{ borderRadius: '15px' }}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Col>
                        <Col className="my-1" md={2}>
                            <Icon.Funnel size={28} onClick={handleShowFilterModal} style={{ cursor: 'pointer' }} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                {
                    filteredCards.length === 0 ? (
                        <Col className='text-center'>
                            <p>Seçimlerinize uygun sınıf bulunamadı.</p>
                        </Col>
                    ) :
                        filteredCards.map((card) => (
                            <Col key={card.id} md={6} className="mb-4 ">
                                <Card className="py-3" onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }}>
                                    <Card.Body>
                                        <Row className='row-cols-auto '>
                                            <Col md={7}> <Card.Title className="fw-bold ">{card.title}</Card.Title></Col>
                                            <Col md={2} >
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Projeksiyon Cihazı</Tooltip>}
                                                >
                                                    <div style={{ cursor: 'pointer' }}>
                                                        <Icon.Projector size={30} />
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>
                                            <Col md={2}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Bilgisayar Laboratuvarı</Tooltip>}
                                                >
                                                    <div style={{ cursor: 'pointer' }}>
                                                        <Icon.PcDisplay size={20} />
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>

                                        <Card.Text className="text-muted fw-light fw-bold">{card.text}</Card.Text>
                                        <Card.Text className="fw-bolder">{card.text2}</Card.Text>



                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                        )}
            </Row>

            {/* Filtre Modal */}
            <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Filtrele</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCapacity">
                            <Form.Label>Kapasite</Form.Label>
                            <ProgressBar
                                now={filterOptions.capacity}
                                max={200}  // max kapasite değeri
                                label={`${filterOptions.capacity}`}  // Kapasiteyi tam sayı olarak göster
                            />
                            <Form.Control
                                type="range"
                                min={0}
                                max={200}
                                step={1}
                                name="capacity"
                                value={filterOptions.capacity}
                                onChange={handleFilterChange}
                            />
                            <Form.Text className="text-muted">
                                Kapasite: {filterOptions.capacity} kişi
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formClassType">
                            <Form.Label>Sınıf Türü</Form.Label>
                            <Form.Control
                                as="select"
                                name="classType"
                                value={filterOptions.classType}
                                onChange={handleFilterChange}
                            >
                                <option value="">Tümü</option>
                                <option value="Derslik">Derslik</option>
                                <option value="Amfi">Amfi</option>
                                <option value="Laboratuvar">Laboratuvar</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formProjection">
                            <Form.Label>Projeksiyon</Form.Label>
                            <Form.Control
                                as="select"
                                name="projection"
                                value={filterOptions.projection}
                                onChange={handleFilterChange}
                            >
                                <option value="">Tümü</option>
                                <option value="true">Var</option>
                                <option value="false">Yok</option>
                            </Form.Control>
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseFilterModal}>Kapat</Button>
                    <Button variant="primary" onClick={handleCloseFilterModal}>Uygula</Button>
                </Modal.Footer>
            </Modal>

            {/* Card Detayları Modal */}
            {selectedCard && (
                <Modal show={showModal} size="lg" onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCard.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Header>
                        {selectedCard.text2} - Bilgisayar Mühendisliği
                        <br /> Bitiş saati <b>13:00</b>
                    </Modal.Header>
                    <Modal.Body>

                    {userType!=="student" && <Button
                            variant="outline-primary"
                            className="mt-3"
                            onClick={handleAddLessonClick}
                        >
                            Ek Ders Ekle
                        </Button> } 
                        {showAddLesson && (
                            <Form className="mt-3">
                                <Form.Group controlId="formLesson">
                                    <Form.Label>Ders</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={lessonDetails.title}
                                        onChange={handleLessonDetailsChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDate">
                                    <Form.Label>Tarih</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={lessonDetails.date}
                                        onChange={handleLessonDetailsChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formStartTime" className="mt-2">
                                    <Form.Label>Başlangıç Saati</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="startTime"
                                        value={lessonDetails.startTime}
                                        onChange={handleLessonDetailsChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEndTime" className="mt-2">
                                    <Form.Label>Bitiş Saati</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="endTime"
                                        value={lessonDetails.endTime}
                                        onChange={handleLessonDetailsChange}
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    className="mt-3"
                                    onClick={handleSaveLesson}
                                >
                                    Kaydet
                                </Button>
                            </Form>
                        )}
                       {userType==="student" ? <ClassCalendarStudent/>: <ClassCalendar onDataSubmit={handleDataFromChild} lessonName={lessonDetails.title} lesson={lessonDetails} events={events} setEvents={setEvents} /> } 

                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
};

export default Classes;
