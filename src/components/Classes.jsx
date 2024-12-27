import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Dropdown, DropdownButton, Modal, Button, ProgressBar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import ClassCalendar from './ClassCalendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { UserContext } from './UserContext';
import ClassCalendarStudent from './ClassCalendarStudent';
import getAllRooms from '../utils/ApiService';

const Classes = ({ col }) => {

    const { userType } = useContext(UserContext);

    const [events, setEvents] = useState([
        {
            title: 'Mimari mimari mimari mimari',
            start: new Date(2024, 11, 19, 10, 0), // 19 Aralık 2024, 10:00
            end: new Date(2024, 11, 19, 13, 0),
            type: "Bilgisayar Mühendisliği",
            message: "Ali Duru"
        },
        {
            title: 'Yazılım Eğitimi',
            start: new Date(2024, 10, 14, 13, 30), // 14 Kasım 2024, 13:30
            end: new Date(2024, 10, 14, 15, 0),
            type: "Telafi dersi",
            message: "Aylin Kaya"
        },
        {
            title: 'Etkinlik',
            start: new Date(2024, 10, 14, 16, 0), // 14 Kasım 2024, 16:00
            end: new Date(2024, 10, 14, 17, 30),
            type: "Etkinlik",
            message: "Seminer: Yazılım Geliştirme"
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        capacity: '',
        projection: '',
        isActive: '',
        isEmpty: '',
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

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await getAllRooms();
            setRooms(events) // Veriyi burada işleyebilirsiniz.
        };

        fetchEvents();
    }, []);




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
    const filteredRooms = rooms.filter(card =>
        card.name.toLowerCase().includes(searchTerm) &&
        (filterOptions.capacity ? card.capacity >= filterOptions.capacity : true) &&
        (filterOptions.isProjectorWorking ? card.isProjectorWorking === (filterOptions.isProjectorWorking === "true") : true) &&
        (filterOptions.isActive ? card.isActive === (filterOptions.isActive === "true") : true) &&
        (filterOptions.isEmpty ? card.isEmpty === (filterOptions.isEmpty === "true") : true) &&
        (filterOptions.classType ? card.classType === filterOptions.classType : true)
    );


    const filterText = `
    ${filterOptions.capacity !== ''
            ? `kapasitesi en az ${filterOptions.capacity} kişilik,` : ""}

    ${filterOptions.classType !== ''
            ? `${filterOptions.classType} türünde,` : ""}

    ${filterOptions.projection !== ''
            ? `projeksiyonu ${filterOptions.projection === "true" ? "bulunan," : "bulunmayan,"} ` : ""}
     ${filterOptions.isEmpty !== ''
            ? `şu anda ${filterOptions.isEmpty === "true" ? "boş," : "dolu,"} ` : ""}
              ${filterOptions.isActive !== ''
            ? `kullanıma ${filterOptions.isActive === "true" ? "açık," : "kapalı,"} ` : ""}

          ${Object.values(filterOptions).every((value) => value === "")
            ? "tüm sınıflar."
            : "olan sınıflar."
        }
    `


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
        setShowAddLesson(showAddLesson === false ? true : showAddLesson)

    };

    const [selectedEvent, setSelectedEvent] = useState({ start: "", end: "", title: "seçilen" })

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

        setSelectedEvent({ start: "", end: "", title: "seçilen" })

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
        <Container className='w-100  '>

            <Row className=" pt-2 bg-light" style={{ position: "sticky", top: 0, zIndex: 100 }}>

                <Col>
                    <h2 className='ps-2'>Sınıflar</h2>

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
                            <Icon.Funnel size={28} onClick={handleShowFilterModal} className='cursor-pointer' />
                        </Col>
                    </Row>
                </Col>
                <p className='ps-4 bg-light' style={{ position: "sticky", top: 0, zIndex: 100 }}>{filterText}</p>

            </Row>

            <Row>

                {
                    filteredRooms.length === 0 ? (
                        <Col className='text-center'>
                            <p className='fw-semibold'>Seçimlerinize uygun sınıf bulunamadı.</p>
                        </Col>
                    ) :
                     
                        filteredRooms.map((card) => (
                            <Col key={card.roomId} md={col} className="mb-4 ">
                                <Card
                                    className={`py-3 ${card.isActive ? "cursor-pointer" : "hover-disable-card"} 
                                    ${(card.isEmpty && card.isActive) ? "shadow-sm-success" : (!card.isActive) ? "shadow-lg-danger" : ""}
            
                                     `}

                                    onClick={() => !card.isActive ? null : handleCardClick(card)}
                                    style={{ height: "20vh" }}
                                >
                                    <Card.Body>
                                        <Row className='row-cols-auto '>
                                            <Col md={7}> <Card.Title className="fw-bold ">{card.name}</Card.Title></Col>

                                            {card.isProjectorWorking && <Col md={2} >
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Projeksiyon Cihazı</Tooltip>}
                                                >
                                                    <div className='cursor-pointer'>
                                                        <Icon.Projector size={30} />
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>}

                                            <Col md={2}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Bilgisayar Laboratuvarı</Tooltip>}
                                                >
                                                    <div className='cursor-pointer'>
                                                        <Icon.PcDisplay size={20} />
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>

                                        <Card.Text className={`fw-light fw-bold ${!card.isActive === "Sınıf kapalı" ? "text-danger" : card.text === "Boş" ? "text-success" : "text-muted"}`}>
                                            {card.text}
                                        </Card.Text>

                                        <Card.Text className={`fw-light fw-bold ${!card.isActive === "Sınıf kapalı" ? "text-danger" : card.text === "Boş" ? "text-success" : "text-muted"}`}>
                                            {!card.isActive && <span className='fw-light fw-bold text-danger'>Sınıf kapalı</span>}
                                        </Card.Text>

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
                                {filterOptions.capacity &&
                                    <> Kapasite: Minimum {filterOptions.capacity} kişilik</>}
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
                                <option value="Bilgisayar Laboratuvarı">Bilgisayar Laboratuvarı</option>
                                <option value="Elektrik Laboratuvarı">Elektrik Laboratuvarı</option>
                                <option value="Genetik Laboratuvarı">Genetik Laboratuvarı</option>
                                <option value="Gıda Laboratuvarı">Gıda Laboratuvarı</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formisActive">
                            <Form.Label>Açık/Kapalı Sınıf</Form.Label>
                            <Form.Control
                                as="select"
                                name="isActive"
                                value={filterOptions.isActive}
                                onChange={handleFilterChange}
                            >
                                <option value="">Tümü</option>
                                <option value={true}>Açık sınıflar</option>
                                <option value={false}>Kapalı sınıflar</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formisempty">
                            <Form.Label>Boş/Dolu Sınıf</Form.Label>
                            <Form.Control
                                as="select"
                                name="isEmpty"
                                value={filterOptions.isEmpty}
                                onChange={handleFilterChange}
                            >
                                <option value="">Tümü</option>
                                <option value={true}>Boş sınıflar</option>
                                <option value={false}>Dolu sınıflar</option>
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
                                <option value={true}>Var</option>
                                <option value={false}>Yok</option>
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
                        <Modal.Title>{selectedCard.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Header>
                        {selectedCard.text === "Ders işleniyor" && (
                            <>
                                {selectedCard.text2} - Bilgisayar Mühendisliği - <b>13:00</b>

                            </>
                        )}
                    </Modal.Header>

                    <Modal.Body>

                        {userType !== "student" && <Button
                            variant="outline-primary"
                            className="mb-2"
                            onClick={handleAddLessonClick}
                        >
                            Ek Ders Ekle
                        </Button>}
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

                                <Row>
                                    <Col>
                                        <Form.Group controlId="formDate">
                                            <Form.Label>Tarih</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={lessonDetails.date}
                                                onChange={handleLessonDetailsChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formStartTime" className="mt-2">
                                            <Form.Label>Başlangıç Saati</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="startTime"
                                                value={lessonDetails.startTime}
                                                onChange={handleLessonDetailsChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formEndTime" className="mt-2">
                                            <Form.Label>Bitiş Saati</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="endTime"
                                                value={lessonDetails.endTime}
                                                onChange={handleLessonDetailsChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>



                                <Button
                                    variant="success"
                                    className="mt-3"
                                    onClick={handleSaveLesson}
                                >
                                    Kaydet
                                </Button>
                            </Form>
                        )}
                        {userType === "student"
                            ? <ClassCalendarStudent />
                            : <ClassCalendar
                                onDataSubmit={handleDataFromChild}
                                lessonName={lessonDetails.title}
                                lesson={lessonDetails}
                                events={events}
                                setEvents={setEvents}
                                selectedEvent={selectedEvent}
                                setSelectedEvent={setSelectedEvent} />}

                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
};

export default Classes;