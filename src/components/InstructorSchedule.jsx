import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { RRule } from "rrule";
import { Modal, Button, Form, Card, DropdownButton, Dropdown, Col, Row, Container } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ClassCalendar from "./ClassCalendar";
import ClassChangeCalendar from "./ClassChangeCalendar";
import ClassesList from "./ClassesList";
import { getLecturesByRoomId, getLecturesByStudentId, getScheduleByInstructorId } from "../utils/LectureApiService";
import { addExtraLecture, changeLectureRoomTime, deleteLectureSession } from "../utils/InstructorsApiService";

// Localizer ayarı
const localizer = momentLocalizer(moment);
let instructorid = 1

const InstructorSchedule = ({ lesson }) => {

  const [schedule, setSchedule] = useState([])
  useEffect(() => {
    const fetchEvents = async () => {
      // const events = await getLecturesByStudentId(instructorid);
      const events = await getScheduleByInstructorId(instructorid);
      setSchedule(events.schedule) // Veriyi burada işleyebilirsiniz.
    };

    fetchEvents();
  }, []);


  console.log(schedule)


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



  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChangeClassModal, setShowChangeClassModal] = useState(false);

  const [showExtraLessonModal, setShowExtraLessonModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);




  const handleDataFromChild = (value) => {
    // Update the lessonDetails with the received data
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


    if (selectedEvent && selectedCard) {

      console.log(selectedEvent)
         
      const changeLectureDetails ={
        date: lessonDetails.date,
        startTime: lessonDetails.startTime,
        endTime: lessonDetails.startTime,
        roomName: selectedCard.name
        }

      try {
          await changeLectureRoomTime(selectedEvent.lectureSessionId, changeLectureDetails)
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

      setShowChangeClassModal(false); // Modal'ı kapat
    }
    else {
      setShowMessage(true)
    }

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
    if (selectedEvent) {

      const data = {
        roomId: selectedCard.name,
        startTime: lessonDetails.startTime,
        endTime: lessonDetails.endTime,
        day: moment(lessonDetails.date).format("dddd"),
        selectedCard: selectedCard
      }
      console.log(lessonDetails.date)
      console.log(data)

      const extraLesson = {
        instructorId: instructorid,
        lectureCode: selectedEvent.lectureCode,
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

      //  console.log(selectedEvent)

      // State'i güncelle

      // console.log("Güncellenmiş Etkinlikler:", updatedEvents);
      // setShowChangeClassModal(false); // Modal'ı kapat

      handleCloseExtraLessonModal(


      )
    }
  }

 const handleDelete = async () => {
  try {
    await deleteLectureSession(selectedEvent.lectureSessionId)
    setShowDeleteModal(false)
      setShowModal(false)

  } catch (error) {
    alert("Ders silinirken hata oluştu.")
  }
 }


  const [showComponent, setShowComponent] = useState(false);

  const handleToggleComponent = () => {
    setShowComponent(!showComponent);
  };


  const handleSelectClass = () => {
    handleToggleComponent()

  }

  const EventComponent = ({ event }) => {
    // Sadece "week" görünümünde özelleştirilmiş tasarımı göster

    return (
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

  console.log(selectedEvent)

  return (
    <>
      <Calendar
        localizer={localizer}
        events={[...scheduleEvent]}
        startAccessor="start"
        endAccessor="end"
        defaultView="work_week"
        views={{ work_week: true, day: true }}
        style={{ height: "100%" }}
        min={new Date().setHours(8, 0, 0)}
        max={new Date().setHours(22, 0, 0)}
        components={{
          event: EventComponent, // Özel etkinlik bileşeni
        }}
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

      {/* Ana Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Başlangıç:</strong> {moment(selectedEvent?.start).format("DD MMMM YYYY, HH:mm")}</p>
          <p><strong>Bitiş:</strong> {moment(selectedEvent?.end).format("DD MMMM YYYY, HH:mm")}</p>
          <p><strong>Sınıf:</strong> {selectedEvent?.roomName}</p>
          <Button onClick={handleOpenChangeClassModal}>Tarih ve sınıfı değiştir</Button>
          <Button onClick={()=> setShowDeleteModal(true)}>İptal et</Button>
          <Button onClick={handleOpenExtraLessonModal}>Ek ders yap</Button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sınıf Değiştirme Modalı */}
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
    </>
  );
};

export default InstructorSchedule;
