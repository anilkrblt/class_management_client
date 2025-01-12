import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, ProgressBar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import ClassCalendar from './ClassCalendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { UserContext } from './UserContext';
import ClassCalendarStudent from './ClassCalendarStudent';
import getAllRooms from '../utils/ApiService';
import { getLecturesByInstructorId } from '../utils/LectureApiService';
import { addExtraLecture } from '../utils/InstructorsApiService';



const Classes = ({ col }) => {


    const now = new Date();
    const { userType, userId } = useContext(UserContext);

    const [events, setEvents] = useState([]);
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

    const [showAddLesson, setShowAddLesson] = useState(false);
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
            setRooms(events) 
        };

        fetchEvents();
    }, []);

    const [lectures, setLectures] = useState([]);
    useEffect(() => {
        if (userType === "instructor") {
            const fetchEvents = async () => {
                const events = await getLecturesByInstructorId(Number(userId));
                setLectures(events); 
            };

            fetchEvents();
        }
    }, []);



    const typeCode2Name = (typeName) => {

        switch (typeName) {
            case 0:
                return "Derslik"
            case 5:
                return "Amfi"
            case 2:
                return "Bilgisayar Laboratuvarı"
            case 1:
                return "Elektrik Laboratuvarı"
            case 3:
                return "Genetik Laboratuvarı"
            case 4:
                return "Gıda Laboratuvarı"
            case 6:
                return "Makine Laboratuvarı"
        }

    }


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

    const filteredRooms = rooms.filter(card =>
        card.name.toLowerCase().includes(searchTerm) &&
        (filterOptions.capacity ? card.capacity >= filterOptions.capacity : true) &&
        (filterOptions.projection ? card.isProjectorWorking === (filterOptions.projection === "true") : true) &&
        (filterOptions.isActive ? card.isActive === (filterOptions.isActive === "true") : true) &&
        (filterOptions.classType ? typeCode2Name(card.roomType) === filterOptions.classType : true) &&


        (filterOptions.isEmpty
            ? card.lectures.find(lecture =>
                new Date(`${lecture.date.split("T")[0]}T${lecture.startTime}`) < now &&
                new Date(`${lecture.date.split("T")[0]}T${lecture.endTime}`) > now
            )
            : true

        ))

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

        setLessonDetails((prev) => ({
            ...prev,
            date: value.date,
            startTime: value.startTime,
            endTime: value.endTime,
            type: "Ek ders",
        }));

        setShowAddLesson(showAddLesson === false ? true : showAddLesson)

    };

    const [selectedEvent, setSelectedEvent] = useState({ start: "", end: "", title: "seçilen" })
 
    const handleSaveLesson = async () => {
        
        if (!lessonDetails.title || !lessonDetails.date || !lessonDetails.startTime || !lessonDetails.endTime) {
            alert('Lütfen tüm alanları doldurunuz.');
            return;
        }

     
        const start = new Date(`${lessonDetails.date}T${lessonDetails.startTime}`);
        const end = new Date(`${lessonDetails.date}T${lessonDetails.endTime}`);

  
        const hasConflict = events.some(event => {
            return (
                (start >= event.start && start < event.end) || 
                (end > event.start && end <= event.end) ||    
                (start <= event.start && end >= event.end)  
            );
        });

        if (hasConflict) {
            alert('Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.');
            return;
        }

        const selectedLectureCode = lectures.find(lecture => lecture.name === lessonDetails.title).code
        const extraLesson = {
            instructorId: Number(userId),
            lectureCode: selectedLectureCode,
            startTime: lessonDetails.startTime,
            endTime: lessonDetails.endTime,
            eventDate: lessonDetails.date,
            roomName: selectedCard.name
        }

        try {
            await addExtraLecture(extraLesson)

        } catch (error) {
            alert("Ders eklenirken bir hata oluştu. Lütfen tekrar deneyin.")
        }


        setSelectedEvent({ start: "", end: "", title: "seçilen" })

        setLessonDetails({
            title: "",
            date: "",
            startTime: "",
            endTime: "",
            type: "Ek ders",
        });

        setShowAddLesson(false);
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
                                    ${(!card.lectures.find(lecture => new Date(`${lecture.date.split("T")[0]}T${lecture.startTime}`) < now &&
                                        new Date(`${lecture.date.split("T")[0]}T${lecture.endTime}`) > now)?.lectureName && card.isActive) ? "shadow-sm-success" : (!card.isActive) ? "shadow-lg-danger" : ""}
            
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

                                            {card.roomType === 1 && <Col md={2}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Elektrik Laboratuvarı</Tooltip>}
                                                >
                                                    <div className='cursor-pointer'>
                                                        <Icon.LightningFill size={20} />
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>}
                                            {card.roomType === 2 && <Col md={2}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Bilgisayar Laboratuvarı</Tooltip>}
                                                >
                                                    <div className='cursor-pointer'>
                                                        <Icon.PcDisplay size={20} />
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>}



                                            {card.roomType === 3 && <Col md={2}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Genetik Laboratuvarı</Tooltip>}
                                                >
                                                    <div className='cursor-pointer'>
                                                        <span class="material-symbols-outlined">genetics</span>

                                                    </div>
                                                </OverlayTrigger>
                                            </Col>}

                                            {card.roomType === 4 && <Col md={2}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Gıda Laboratuvarı</Tooltip>}
                                                >
                                                    <div className='cursor-pointer'>
                                                        <span class="material-symbols-outlined">fastfood</span>
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>}

                                            {card.roomType === 6 && <Col md={2}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top">Makine Laboratuvarı</Tooltip>}
                                                >
                                                    <div className='cursor-pointer'>
                                                        <Icon.GearFill size={20} />
                                                    </div>
                                                </OverlayTrigger>
                                            </Col>}

                                        </Row>

                                        <Card.Text className={`fw-light fw-bold ${!card.isActive ? "text-danger" : card.text === "Boş" ? "text-success" : "text-muted"}`}>
                                            {!card.isActive && <span className='fw-light fw-bold text-danger'>Sınıf kapalı</span>}
                                        </Card.Text>

                                        <Card.Text className="fw-bolder">{card.text2}</Card.Text>


                                        {(() => {
                                            const currentLecture = card.lectures.find(lecture => {
                                                const lectureStart = new Date(`${lecture.date.split("T")[0]}T${lecture.startTime}`);
                                                const lectureEnd = new Date(`${lecture.date.split("T")[0]}T${lecture.endTime}`);
                                                return lectureStart < now && lectureEnd > now;
                                            });
                                            const currentClub = card.clubEvents.find(club => {
                                                const clubStart = new Date(`${club.eventDate.split("T")[0]}T${club.startTime}`);
                                                const clubEnd = new Date(`${club.eventDate.split("T")[0]}T${club.endTime}`);
                                                return clubStart < now && clubEnd > now;
                                            });

                                            if (currentLecture && card.isActive) {
                                                return (
                                                    <>
                                                        <Card.Text className='fw-light fw-bold'>Ders işleniyor</Card.Text>
                                                        {currentLecture.lectureName}
                                                    </>
                                                );
                                            } 

                                            if (currentClub && card.isActive) {
                                                return (
                                                    <>
                                                        <Card.Text className='fw-light fw-bold'>Kulüp etkinliği yapılıyor</Card.Text>
                                                        {currentClub.clubName} - {currentClub.title}
                                                    </>
                                                );
                                            } 
                                            
                                            else if (card.isActive) {
                                                return <Card.Text className='text-success fw-light fw-bold'>Boş</Card.Text>;
                                            }

                                            return null;
                                        })()}

                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                        )}
            </Row>

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
                                max={200} 
                                label={`${filterOptions.capacity}`}  
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

            {selectedCard && (
                <Modal show={showModal} size="lg" onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCard.name}</Modal.Title>
                    
                        {selectedCard.lectures.find(lecture => new Date(`${lecture.date.split("T")[0]}T${lecture.startTime}`) < now &&
                            new Date(`${lecture.date.split("T")[0]}T${lecture.endTime}`) > now)?.lectureName &&
                            <>
                                <span className='fw-semibold'>İşlenen ders: </span>{" "}{selectedCard.lectures.find(lecture => new Date(`${lecture.date.split("T")[0]}T${lecture.startTime}`) < now &&
                                    new Date(`${lecture.date.split("T")[0]}T${lecture.endTime}`) > now)?.lectureName}
                                {selectedCard.lectures.find(lecture => lecture.startTime < "09:00" && lecture.endTime > "09:00")?.endTime}
                            </>}
                    </Modal.Header>

                    <Modal.Body>

                        {userType !== "student" && <Button
                            variant= {showAddLesson ? "primary" : "outline-primary"}
                            className="mb-2"
                            onClick={handleAddLessonClick}
                        >
                            Ek Ders Ekle
                        </Button>}
                        {showAddLesson && (
                            <Form className="mb-2">

                                <Form.Group controlId="formLesson">
                                    <Form.Label>Ders</Form.Label>
                                    <Form.Select name="title"
                                        value={lessonDetails.title}
                                        onChange={handleLessonDetailsChange}>
                                        <option value="">Seçin</option>
                                        {lectures.map(lecture => (
                                            <option key={lecture.name} value={lecture.name}>{lecture.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Row className='d-flex'>
                                    <Col md={3}>
                                        <Form.Group controlId="formDate">
                                            <Form.Label className='mt-2'>Tarih</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={lessonDetails.date}
                                                onChange={handleLessonDetailsChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
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
                                    <Col md={3}>
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
                                    <Col md={3}>
                                        <Button
                                            variant="success"
                                            className="mt-4"
                                            onClick={handleSaveLesson}
                                        >
                                            Kaydet
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                        {userType === "student"
                            ? <ClassCalendarStudent roomId={selectedCard.roomId} />
                            : <ClassCalendar
                                roomId={selectedCard.roomId}
                                onDataSubmit={handleDataFromChild}
                                lessonName={lessonDetails.title}
                                lesson={lessonDetails}
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