import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { getLecturesByStudentId } from "../utils/LectureApiService";

// Localizer ayarı
const localizer = momentLocalizer(moment);
let studentId = 3

const StudentSchedule = () => {

  const [schedule, setSchedule] = useState([])

    const [view, setView] = useState('day');


  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getLecturesByStudentId(studentId);
      setSchedule(events.schedule) // Veriyi burada işleyebilirsiniz.
    };

    fetchEvents();
  }, []);

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





  const minTime = new Date();
  const maxTime = new Date();
  minTime.setHours(8, 0, 0); // Minimum saati 08:00 olarak ayarla
  maxTime.setHours(22, 0, 0); // Maksimum saati 22:00 olarak ayarla

    const EventComponent = ({ event }) => {
      // Sadece "week" görünümünde özelleştirilmiş tasarımı göster
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
    
      // Her bölüm için farklı sınıf
      switch (event.departmentName) {
        case 'Bilgisayar Mühendisliği':
          className = 'event-cs'; // Bilgisayar Mühendisliği için sınıf
          break;
        case 'Makine Mühendisliği':
          className = 'event-me'; // Makine Mühendisliği için sınıf
          break;
        case 'Genetik ve Biyomühendislik':
          className = 'event-bio'; // Genetik ve Biyomühendislik için sınıf
          break;
        case 'Gıda Mühendisliği':
          className = 'event-food'; // Gıda Mühendisliği için sınıf
          break;
        case 'Elektrik - Elektronik Mühendisliği':
          className = 'event-ee'; // Elektrik-Elektronik Mühendisliği için sınıf
          break;
        default:
          className = 'event-default'; // Varsayılan sınıf
      }
    
      // Kulüp etkinlikleri için farklı sınıf
      if (event.eventType === 'Kulüp etkinliği') {
        className = 'event-club';
      }
    
      return { className }; // Dinamik sınıf adı döndür
    };
  


  return (
    <Calendar
      localizer={localizer}
      events={scheduleEvent}
      startAccessor="start"
      endAccessor="end"
      defaultView="work_week" // Çalışma haftası görünümü
      views={{ work_week: true, day: true }} // Çalışma haftası ekleniyor
      style={{ height: "100%" }}
      min={minTime}
      max={maxTime}
      components={{
        event: EventComponent, // Özel etkinlik bileşeni
      }}
      eventPropGetter={eventPropGetter}
      formats={{
        timeGutterFormat: 'HH:mm',
        dayHeaderFormat: 'DD MMMM dddd', // Tarih formatını "14 Kasım Perşembe" olarak ayarla
        dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
          `${localizer.format(start, 'DD MMMM', culture)} - ${localizer.format(end, 'DD MMMM', culture)}`,
        eventTimeRangeFormat: ({ start, end }) =>
          `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
      }}

      messages={{
        today: 'Bugün',
        previous: 'Dün',
        next: 'Yarın',
        day: 'Günlük',
        week: 'Hafta',
        month: 'Ay',
        agenda: 'Ajanda',
        date: 'Tarih',
        time: 'Saat',
        event: 'Etkinlik',
        work_week: 'Haftalık'
      }}

    />

  );
};

export default StudentSchedule;
