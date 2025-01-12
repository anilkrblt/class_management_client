import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Modal, Button, Form, Col, Row, Container } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ClassChangeCalendar from "./ClassChangeCalendar";
import ClassesList from "./ClassesList";
import { getLecturesByInstructorId, getScheduleByInstructorId } from "../utils/LectureApiService";
import { addExtraLecture, changeLectureRoomTime, deleteLectureSession } from "../utils/InstructorsApiService";
import { getAllRooms } from "../utils/RoomApiService";
import * as Icon from 'react-bootstrap-icons';
import { UserContext } from "./UserContext";

const localizer = momentLocalizer(moment);


const InstructorSchedule = () => {


  const {userId } = useContext(UserContext);
  const [schedule, setSchedule] = useState([])
console.log(userId)
  const [view, setView] = useState('day');
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getScheduleByInstructorId(userId);
      setSchedule(events.schedule)
    };
    fetchEvents();
  }, []);


  const fetchSchedule = async () => {
    const events = await getScheduleByInstructorId(userId);
    setSchedule(events.schedule)
  }


  const scheduleEvent = Array.isArray(schedule)
    ? schedule.map((item) => ({
      title: item.lectureName,
      start: new Date(`${item.date.split("T")[0]}T${item.startTime}`),
      end: new Date(`${item.date.split("T")[0]}T${item.endTime}`),
      departmentName: item.departmentName,
      roomName: item.roomName,
      eventType: item.teacherName,
      lectureCode: item.lectureCode,
      lectureSessionId: item.lectureSessionId
    }))
    : []

  const [lessonDetails, setLessonDetails] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: '',
    location: ''

  });

  const [selectTime, setSelectTime] = useState({
    lecture: '',
    date: '',
    startTime: '',
    endTime: '',

  });

  const handleSelectTime = (e) => {
    const { name, value } = e.target;
    setSelectTime((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const [lectures, setLectures] = useState([])
  useEffect(() => {

    const fetchEvents = async () => {
      const lecture = await getLecturesByInstructorId(Number(userId));
      setLectures(lecture);
    };

    fetchEvents();

  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChangeClassModal, setShowChangeClassModal] = useState(false);
  const [showExtraLessonModal, setShowExtraLessonModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleDataFromChild = (value) => {
    setLessonDetails({
      title: value.title,
      date: value.date,
      startTime: value.startTime,
      endTime: value.endTime,
      type: "Yeni ders zamanı",

    });
  };

  const handleSelectEvent = (event) => {

    setShowMessage();
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleOpenChangeClassModal = () => {
    setShowModal(false);
    setShowChangeClassModal(true);
  };

  const handleCloseChangeClassModal = () => {
    setShowChangeClassModal(false);
    setSelectedCard(null)
    setLessonDetails({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      type: '',
      location: ''

    })
  };


  const handleSave = async () => {

    if (!selectedEvent || !selectedCard) {
      setMessage3(true)
      return
    }
    setMessage3(false)
    const changeLectureDetails = {
      date: lessonDetails.date,
      startTime: lessonDetails.startTime,
      endTime: lessonDetails.startTime,
      roomName: selectedCard.name
    }

    try {
      await changeLectureRoomTime(selectedEvent.lectureSessionId, changeLectureDetails)
      fetchSchedule()
    } catch (error) {
      alert("Ders eklenirken bir hata oluştu. Lütfen tekrar deneyin.")
    }

    const updatedEvents = schedule.map(event =>
      event.title === selectedEvent.title
        ? {
          ...event,
          start: moment(`${lessonDetails.date}T${lessonDetails.startTime}`).toDate(),
          end: moment(`${lessonDetails.date}T${lessonDetails.endTime}`).toDate(),
          location: selectedCard?.title
        }
        : event
    );
    console.log(updatedEvents);

    setShowChangeClassModal(false); 
    setSelectedCard(null)
    setLessonDetails({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      type: '',
      location: ''

    })
  };


  const handleOpenExtraLessonModal = () => {
    setShowExtraLessonModal(true);
  };


  const handleCloseExtraLessonModal = () => {
    setShowExtraLessonModal(false);
  };

  const handleExtraLesson = async () => {
    if (!selectedCard || !selectedEvent) {
      setMessage3(true)
      return
    }
    setMessage3(false)
    const extraLesson = {
      instructorId: Number(userId),
      lectureCode: selectedEvent.lectureCode,
      startTime: lessonDetails.startTime,
      endTime: lessonDetails.endTime,
      eventDate: lessonDetails.date,
      roomName: selectedCard.name
    }

    try {
      await addExtraLecture(extraLesson)
      fetchSchedule()

    } catch (error) {
      alert("Ders eklenirken bir hata oluştu. Lütfen tekrar deneyin.")
    }

    handleCloseExtraLessonModal()

  }

  const handleDelete = async () => {
    try {
      await deleteLectureSession(selectedEvent.lectureSessionId)
      fetchSchedule()
      setShowDeleteModal(false)
      setShowModal(false)

    } catch (error) {
      alert("Ders silinirken hata oluştu.")
    }
  }

  const [rooms, setRooms] = useState()
  useEffect(() => {

    const fetchRooms = async () => {
      const events = await getAllRooms();
      setRooms(events);
    };
    fetchRooms();
  }, []);

  const [emptyRooms, setEmptyRooms] = useState([])
  const fetchEmptyRooms = (start, end) => {
    const availableRooms = rooms.filter(room => {
   
      const lecturesOnDate = room.lectures.filter(lecture =>
        lecture.date.split("T")[0] === start.toISOString().split("T")[0]
      );

      
      const isRoomFree = lecturesOnDate.every(lecture =>
        !(lecture.startTime < end.toTimeString().split(" ")[0] && lecture.endTime > start.toTimeString().split(" ")[0])

      );

      return isRoomFree; 
    });

    setEmptyRooms(availableRooms)

  }

  const [extraLessonModal, setExtraLessonModal] = useState(false)
  const [message, setMessage] = useState(false)
  const [message2, setMessage2] = useState(false)

  const handleSelectSlot = ({ start, end }) => {

    const now = new Date();


    if (start < now) {
      
      setMessage(true)
      return;
    }
    setMessage(false)

    const hasConflict = scheduleEvent.some(event => {
      return (
        (start >= event.start && start < event.end) || 
        (end > event.start && end <= event.end) || 
        (start <= event.start && end >= event.end) 
      );
    });

    if (hasConflict) {
      // alert('Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.');
      setMessage2(true)
      return;
    }

    setMessage2(false)
    setExtraLessonModal(true)

    setSelectTime({
      date: new Date(start).toISOString().split("T")[0] + "T00:00:00",
      startTime: moment(start).format('HH:mm:ss'),
      endTime: moment(end).format('HH:mm:ss'),

    }
    )
    fetchEmptyRooms(start, end)

  }
  const [message3, setMessage3] = useState(false)
  const handleSelectableExtraLesson = async () => {
    if (!selectTime.lecture || !selectTime.startTime || !selectTime.endTime || !selectedCard) {
      setMessage3(true)
      return
    }
    setMessage3(false)
    const extraLesson = {
      instructorId: Number(userId),
      lectureCode: selectTime?.lecture,
      startTime: selectTime?.startTime,
      endTime: selectTime?.endTime,
      eventDate: selectTime?.date,
      roomName: selectedCard?.name
    }


    try {
      await addExtraLecture(extraLesson)
      fetchSchedule()
      setExtraLessonModal(false)
    } catch (error) {
      alert("Ders eklenirken bir hata oluştu. Lütfen tekrar deneyin.")
    }
  }

  const EventComponent = ({ event }) => {
   
    if (view === 'day') {
      return (
        <Container className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center mb-2">
         <Icon.Stack size="1vw" />  
            <strong className="ms-1" style={{ fontSize: "0.9vw" }}>{event.title}</strong>
          </div>
          <div className=" d-flex align-items-center">
            <Icon.BuildingFill size="1.3vw"/>
          <span className='fw-semibold' style={{ fontSize: "1.3vw" }}>{event.roomName}</span>
        </div>
        </Container>
      );
    }
   else return (
      <Container className="d-flex flex-column align-items-center ">
        <div className="d-flex align-items-center ">
          <span className="fw-bolder lh-sm" style={{ fontSize: "1.1vw" }}>{event.title}</span>
        </div>
        <div className=" d-flex align-items-center">
          <span className='fw-semibold' style={{ fontSize: "1.1vw" }}>{event.roomName}</span>
        </div>
      </Container>
    );
  };

  const eventPropGetter = (event) => {
    let className = '';
  
  
    switch (event.departmentName) {
      case 'Bilgisayar Mühendisliği':
        className = 'event-cs'; 
        break;
      case 'Makine Mühendisliği':
        className = 'event-me'; 
        break;
      case 'Genetik ve Biyomühendislik':
        className = 'event-bio'; 
        break;
      case 'Gıda Mühendisliği':
        className = 'event-food';
        break;
      case 'Elektrik - Elektronik Mühendisliği':
        className = 'event-ee'; 
        break;
      default:
        className = 'event-default'; 
    }
  
   
    if (event.eventType === 'Kulüp etkinliği') {
      className = 'event-club';
    }
  
    return { className };
  };

  return (
    <>
      {message && <p className='text-danger fw-semibold'>Geçmiş bir zamana ders ekleyemezsiniz.</p>}
      {message2 && <p className='text-danger fw-semibold'>Seçtiğiniz zaman aralığında başka bir dersiniz bulunuyor</p>}
      <Calendar
        localizer={localizer}
        events={[...scheduleEvent]}
        selectable={true} 
        onSelectSlot={handleSelectSlot}
        startAccessor="start"
        endAccessor="end"
        defaultView="work_week"
        onView={(view) => setView(view)}
        views={{ work_week: true, day: true }}
        style={{ height: "100%" }}
        min={new Date().setHours(8, 0, 0)}
        max={new Date().setHours(22, 0, 0)}
        components={{
          event: EventComponent, 
        }}
        eventPropGetter={eventPropGetter}
        formats={{
          timeGutterFormat: "HH:mm",
          dayHeaderFormat: "DD MMMM dddd",
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, "DD MMMM", culture)} - ${localizer.format(end, "DD MMMM", culture)}`,
          eventTimeRangeFormat: ({ start, end }) =>
            `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
        }}
        messages={{
          today: "Bugün",
          previous: "Önceki",
          next: "Sonraki",
          day: "Günlük",
          week: "Hafta",
          month: "Ay",
          agenda: "Ajanda",
          date: "Tarih",
          time: "Saat",
          event: "Etkinlik",
          work_week: "Haftalık",
        }}
        onSelectEvent={handleSelectEvent}
      />

    
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Başlangıç:</strong> {moment(selectedEvent?.start).format("DD MMMM YYYY, HH:mm")}</p>
          <p><strong>Bitiş:</strong> {moment(selectedEvent?.end).format("DD MMMM YYYY, HH:mm")}</p>
          <p><strong>Sınıf:</strong> {selectedEvent?.roomName}</p>
          <Row className="justify-content-center">
            <Col md="auto"><Button variant="warning" onClick={handleOpenChangeClassModal}>Tarih ve sınıfı değiştir</Button></Col>
            <Col md="auto"><Button variant="success" onClick={handleOpenExtraLessonModal}>Ek ders yap</Button></Col>
            <Col md="auto"><Button variant="danger" onClick={() => setShowDeleteModal(true)}>İptal et</Button></Col>
          </Row>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>

 
      <Modal size="xl" show={showChangeClassModal} onHide={handleCloseChangeClassModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tarih ve Sınıfı Değiştir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="6">
              <div className="d-flex flex-wrap">
                {showMessage && <div className="px-2" style={{ flex: "0 0 100%" }}>
                  <p className="text-danger">Lütfen sınıf ve tarih seçiniz.</p>
                </div>}
                <br />
                {selectedCard && (
                  <div className="px-2" style={{ flex: "0 0 50%" }}>
                    <p>Seçilen sınıf: {selectedCard.name}</p>
                  </div>
                )}
                {lessonDetails.startTime && (
                  <>
                    <div className="px-2" style={{ flex: "0 0 50%" }}>
                      <p>Seçilen başlangıç saati: {lessonDetails.startTime}</p>
                    </div>
                    <div className="px-2" style={{ flex: "0 0 50%" }}>
                      <p>Seçilen bitiş saati: {lessonDetails.endTime}</p>
                    </div>
                    <div className="px-2" style={{ flex: "0 0 50%" }}>
                      <p>Seçilen gün: {moment(lessonDetails.date).format("D MMMM dddd")}</p>
                    </div>
                  </>
                )}

              </div>
              <div className="scrollable"> <ClassesList setSelectedCard={setSelectedCard} /></div>
            </Col>

            <Col md="6">

              <ClassChangeCalendar onDataSubmit={handleDataFromChild} lessonName={selectedEvent?.title} selectedCard={selectedCard} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChangeClassModal}>
            İptal
          </Button>
          {message3 && <p className='text-danger fw-semibold'>Lütfen tüm alanları doldurunuz.</p>}
          <Button variant="primary" onClick={handleSave}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="xl" show={showExtraLessonModal} onHide={handleCloseExtraLessonModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ek Ders Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ders adı: {selectedEvent?.title}
          <Row>
            <Col md="6">
              <div className="d-flex flex-wrap">
                {showMessage && <div className="px-2" style={{ flex: "0 0 100%" }}>
                  <p className="text-danger">Lütfen sınıf ve zaman seçiniz.</p>
                </div>}
                <br />
                {selectedCard && (
                  <div className="px-2" style={{ flex: "0 0 50%" }}>
                    <p>Seçilen sınıf: {selectedCard.name}</p>
                  </div>
                )}
                {lessonDetails.startTime && (
                  <>
                    <div className="px-2" style={{ flex: "0 0 50%" }}>
                      <p>Seçilen başlangıç saati: {lessonDetails.startTime}</p>
                    </div>
                    <div className="px-2" style={{ flex: "0 0 50%" }}>
                      <p>Seçilen bitiş saati: {lessonDetails.endTime}</p>
                    </div>
                    <div className="px-2" style={{ flex: "0 0 50%" }}>
                      <p>Seçilen gün: {moment(lessonDetails.date).format("dddd")}</p>
                    </div>
                  </>
                )}

              </div>
              <div className="scrollable"> <ClassesList setSelectedCard={setSelectedCard} /></div>
            </Col>

            <Col md="6">

              <ClassChangeCalendar onDataSubmit={handleDataFromChild} lessonName={selectedEvent?.title} selectedCard={selectedCard} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExtraLessonModal}>
            İptal
          </Button>
          {message3 && <p className='text-danger fw-semibold'>Lütfen tüm alanları doldurunuz.</p>}
          <Button variant="primary" onClick={handleExtraLesson}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ders İptal Onayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bu dersi iptal etmek istediğinizden emin misiniz?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hayır
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Evet
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={extraLessonModal} size="lg" onHide={() => setExtraLessonModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ek Ders Oluştur</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <Form.Group controlId="lecture">
              <Form.Label>Ders</Form.Label>
              <Form.Select name="lecture"
                value={selectTime.lecture}
                onChange={handleSelectTime}>
                <option value="">Seçin</option>
                {lectures.map(lecture => (
                  <option key={lecture.code} value={lecture.code}>{lecture.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="date" className="mt-2">
                  <Form.Label>Tarih</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={selectTime.date}
                    onChange={handleSelectTime}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="startTime" className="mt-2">
                  <Form.Label>Başlangıç Saati</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={selectTime.startTime}
                    onChange={handleSelectTime}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="endTime" className="mt-2">
                  <Form.Label>Bitiş Saati</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={selectTime.endTime}
                    onChange={handleSelectTime}
                  />
                </Form.Group>
              </Col>
              <div className="scrollable mt-4">
                <h6>Seçtiğiniz tarih ve saat aralığında boş olan sınıflar</h6>
                <ClassesList emptyRooms={emptyRooms} setSelectedCard={setSelectedCard} />
              </div>


            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExtraLessonModal(false)}>
            İptal
          </Button>

          {message3 && <p className='text-danger fw-semibold'>Lütfen tüm alanları doldurunuz.</p>}
          <Button variant="danger" onClick={() => handleSelectableExtraLesson()}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InstructorSchedule;
