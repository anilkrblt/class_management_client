import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { RRule } from "rrule";
import { Modal, Button, Form, Card, DropdownButton, Dropdown, Col, Row, Container } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ClassCalendar from "./ClassCalendar";
import ClassChangeCalendar from "./ClassChangeCalendar";
import ClassesList from "./ClassesList";

// Localizer ayarı
const localizer = momentLocalizer(moment);

// RRule ile tekrar eden etkinlikleri oluşturma fonksiyonu
const generateRecurringEvents = (title, start, end, rule, location) => {
  const rrule = new RRule({
    ...rule,
    dtstart: new Date(start), // Tarihi doğru biçimde dönüştürün
  });

  return rrule.all().map(date => ({
    title,
    start: new Date(date),
    end: new Date(
      moment(date)
        .add(moment(end).diff(moment(start), "minutes"), "minutes")
        .toISOString()
    ),
    location,
  }));
};

const InstructorSchedule = ({ lesson }) => {
  // Etkinlik tanımları
  const [baseEvents, setBaseEvents] = useState([
    {
      title: "Makine Öğrenmesi",
      start: moment().day(2).hour(13).minute(30).toDate(),
      end: moment().day(2).hour(15).minute(30).toDate(),
      rule: { freq: RRule.WEEKLY, interval: 1, count: 12 },
      location: "A Blok 101",
    },
    {
      title: "Mobil Uygulama Geliştirme",
      start: moment().day(1).hour(10).minute(30).toDate(),
      end: moment().day(1).hour(16).minute(30).toDate(),
      rule: { freq: RRule.WEEKLY, interval: 1, count: 12 },
      location: "B Blok 202",
    },
    {
      title: "Kriptoloji",
      start: moment().day(2).hour(9).minute(30).toDate(),
      end: moment().day(2).hour(12).minute(0).toDate(),
      rule: { freq: RRule.WEEKLY, interval: 1, count: 12 },
      location: "C Blok 303",
    },
  ])
  const [lessonDetails, setLessonDetails] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: '',
    location: ''

  });
  // Tüm tekrar eden etkinlikleri oluştur
  const [events,setEvents] = useState(baseEvents.flatMap(event =>
    generateRecurringEvents(event.title, event.start, event.end, event.rule, event.location,)
  )) 


  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChangeClassModal, setShowChangeClassModal] = useState(false);

  const [showExtraLessonModal, setShowExtraLessonModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showMessage, setShowMessage] = useState(false);





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


  const handleSave = () => {


    if (selectedEvent && selectedCard) {

      // `baseEvents` üzerinde değişiklik yapmadan yeni bir liste oluştur
      const updatedEvents = baseEvents.map(event =>
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

      // State'i güncelle
      setBaseEvents(updatedEvents); //? şüpheli
      setEvents(updatedEvents.flatMap(event =>
        generateRecurringEvents(event.title, event.start, event.end, event.rule, event.location)
      ));
      setShowChangeClassModal(false); // Modal'ı kapat
      console.log(updatedEvents);
      
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
console.log(baseEvents);

  const handleCancelLesson = () => {

    if (selectedEvent) {
      // Seçilen etkinliği kaldır
      const updatedEvents = events.filter(
        event =>
          !(
            event.title === selectedEvent.title &&
            event.start.getTime() === selectedEvent.start.getTime() &&
            event.end.getTime() === selectedEvent.end.getTime()
          )
      );
      console.log(updatedEvents)

      setEvents(updatedEvents)

      // State'i güncelle
  //    setBaseEvents(updatedEvents);

      // Modal'ı kapat ve seçimi sıfırla
      setShowModal(false);
      setSelectedEvent(null);
    }
 
    
  };

  console.log(events)


  const handleOpenExtraLessonModal = () => {
    setShowExtraLessonModal(true);
  };


  const handleCloseExtraLessonModal = () => {
    setShowExtraLessonModal(false);
  };

  const handleExtraLesson = () => {
    if (selectedEvent) {
      // `baseEvents` üzerinde değişiklik yapmadan yeni bir liste oluştur
      console.log(selectedEvent)
      const updatedEvents = [...baseEvents, {
        title: selectedEvent.title,
        start: moment(`${lessonDetails.date}T${lessonDetails.startTime}`).toDate(),
        end: moment(`${lessonDetails.date}T${lessonDetails.endTime}`).toDate(),
        location: selectedCard.title,
        rule: { freq: RRule.DAILY, interval: 1, count: 1 },
        text: "Ek ders"
      }]

      // State'i güncelle
    //  setBaseEvents(updatedEvents);
       console.log("Güncellenmiş Etkinlikler:", updatedEvents);
      // setShowChangeClassModal(false); // Modal'ı kapat

      setEvents(updatedEvents.flatMap(event =>
        generateRecurringEvents(event.title, event.start, event.end, event.rule, event.location)
      ));
      console.log(events);
      

      handleCloseExtraLessonModal(

        
      )
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
      <Container className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center ">
          <span className=" fw-bolder lh-sm" style={{fontSize:"1.8vw"}}>{event.title}</span>
        </div>
        <div className=" d-flex align-items-center mt-2">
          <span className='fw-semibold' style={{fontSize:"1.5vw"}}>{event.location}</span>
        </div>
        <div className=" d-flex align-items-center mt-2">
          <span className='fs-5 fw-medium'>{event.text}</span>
        </div>
       


      </Container>
    );



  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
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
          <p><strong>Sınıf:</strong> {selectedEvent?.location}</p>
          <Row className="d-flex justify-content-center">
            <Col md="auto">
              <Button onClick={handleOpenChangeClassModal}>Sınıfı değiştir</Button>
            </Col>
            <Col md="auto">
            <Button onClick={handleCancelLesson}>İptal et</Button>
            </Col>
            <Col md="auto">
            <Button onClick={handleOpenExtraLessonModal}>Ek ders yap</Button>
            </Col>
          </Row>
          
          
          

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
          <Modal.Title>Sınıfı Değiştir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="6">
              <div className="d-flex flex-wrap">
                {showMessage && <div className="px-2" style={{ flex: "0 0 100%" }}>
                  <p className="text-danger">Lütfen sınıf ve zaman seçiniz.</p>
                </div>}
                <br />
                {selectedCard && (
                  <div className="px-2" style={{ flex: "0 0 50%" }}>
                    <p>Seçilen sınıf: {selectedCard.title}</p>
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

              <ClassChangeCalendar onDataSubmit={handleDataFromChild} lessonName={selectedEvent?.title} />
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
                    <p>Seçilen sınıf: {selectedCard.title}</p>
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

              <ClassChangeCalendar onDataSubmit={handleDataFromChild} lessonName={selectedEvent?.title} />
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

    </>
  );
};

export default InstructorSchedule;
