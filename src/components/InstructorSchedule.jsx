import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { RRule } from "rrule";
import { Modal, Button, Form } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ClassCalendar from "./ClassCalendar";
import ClassChangeCalendar from "./ClassChangeCalendar";

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
    type: ''

  });
  // Tüm tekrar eden etkinlikleri oluştur
  const events = baseEvents.flatMap(event =>
    generateRecurringEvents(event.title, event.start, event.end, event.rule, event.location)
  );


  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChangeClassModal, setShowChangeClassModal] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [showExtraLessonModal, setShowExtraLessonModal] = useState(false);


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
  console.log(lessonDetails)
  const handleSelectEvent = (event) => {
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
    setNewLocation("");
  };

  const handleSaveNewLocation = () => {
    if (selectedEvent) {
      selectedEvent.location = newLocation; // Yeni sınıf bilgisini güncelle
      setShowChangeClassModal(false);
    }
  };

  const handleSave = () => {
    if (selectedEvent) {
      // `baseEvents` üzerinde değişiklik yapmadan yeni bir liste oluştur
      const updatedEvents = baseEvents.map(event =>
        event.title === selectedEvent.title
          ? {
            ...event,
            start: moment(`${lessonDetails.date}T${lessonDetails.startTime}`).toDate(),
            end: moment(`${lessonDetails.date}T${lessonDetails.endTime}`).toDate(),
            location: newLocation
          }
          : event
      );

      // State'i güncelle
      setBaseEvents(updatedEvents);
      console.log("Güncellenmiş Etkinlikler:", updatedEvents);
      setShowChangeClassModal(false); // Modal'ı kapat
    }
  };

  const handleCancelLesson = () => {
    console.log(selectedEvent)
  }

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
        location: newLocation,
        rule: { freq: RRule.DAILY, interval: 1, count: 1 },
    }]

      // State'i güncelle
      setBaseEvents(updatedEvents);
     // console.log("Güncellenmiş Etkinlikler:", updatedEvents);
     // setShowChangeClassModal(false); // Modal'ı kapat
    }
  }

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
          day: "Gün",
          week: "Hafta",
          month: "Ay",
          agenda: "Ajanda",
          date: "Tarih",
          time: "Saat",
          event: "Etkinlik",
          work_week: "Çalışma Haftası",
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
          <Button onClick={handleOpenChangeClassModal}>Sınıfı değiştir</Button>
          <Button onClick={handleCancelLesson}>İptal et</Button>
          <Button onClick={handleOpenExtraLessonModal}>Ek ders yap</Button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sınıf Değiştirme Modalı */}
      <Modal show={showChangeClassModal} onHide={handleCloseChangeClassModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sınıfı Değiştir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Yeni Sınıf</Form.Label>

              <Form.Select name="newClass" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}>
                <option>Sınıf seçin</option>
                <option value="L208">L208</option>
                <option value="L305">L305</option>
                <option value="L104">L104</option>
                <option value="D204">D204</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <p> Seçilen başlangıç saati {lessonDetails.startTime}</p>
          <p>Seçilen bitiş saati {lessonDetails.endTime}</p>
          <p>Seçilen gün: {moment(lessonDetails.date).format("dddd")}</p>
          <Button onClick={handleSave}>Kaydet</Button>



          <ClassChangeCalendar onDataSubmit={handleDataFromChild} lessonName={selectedEvent?.title} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChangeClassModal}>
            İptal
          </Button>
          <Button variant="primary" onClick={handleSaveNewLocation}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showExtraLessonModal} onHide={handleCloseExtraLessonModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ek Ders Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Ders adı: {selectedEvent?.title}
         <Form>
            <Form.Group>
              <Form.Label>Yeni Sınıf</Form.Label>

              <Form.Select name="newClass" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}>
                <option>Sınıf seçin</option>
                <option value="L208">L208</option>
                <option value="L305">L305</option>
                <option value="L104">L104</option>
                <option value="D204">D204</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <p> Seçilen başlangıç saati {lessonDetails.startTime}</p>
          <p>Seçilen bitiş saati {lessonDetails.endTime}</p>
          <p>Seçilen gün: {moment(lessonDetails.date).format("dddd")}</p>
          <Button onClick={handleExtraLesson}>Kaydet</Button>

          <ClassChangeCalendar onDataSubmit={handleDataFromChild} lessonName={selectedEvent?.title} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExtraLessonModal}>
            İptal
          </Button>
          <Button variant="primary" onClick={() => {
            // Ek ders detaylarını kaydet
            setBaseEvents([...baseEvents, {
              title: lessonDetails.title,
              start: moment(`${lessonDetails.date}T${lessonDetails.startTime}`).toDate(),
              end: moment(`${lessonDetails.date}T${lessonDetails.endTime}`).toDate(),
              location: lessonDetails.location,
              rule: { freq: RRule.DAILY, interval: 1, count: 1 }, // Tek seferlik ders
            }]);
            handleCloseExtraLessonModal(); // Modal'ı kapat
          }}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default InstructorSchedule;
