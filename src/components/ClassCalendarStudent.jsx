import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);

const ClassCalendarStudent = () => {
  const [view, setView] = useState('day');

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



  // Geçmiş etkinlikleri filtrele
  const currentTime = new Date();
  const futureEvents = events.filter(event => new Date(event.start) >= currentTime);

  // min ve max için yalnızca saat sınırlarını belirle
  const minTime = new Date();
  minTime.setHours(8, 0, 0); // Sabah 08:00

  const maxTime = new Date();
  maxTime.setHours(20, 0, 0); // Akşam 20:00

  // Özel etkinlik bileşeni
  const EventComponent = ({ event }) => {
    // Sadece "week" görünümünde özelleştirilmiş tasarımı göster
    if (view === 'day') {
      return (
        <Container className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center mb-2">
            <Icon.Stack size="2.1vw" />
            <strong className="ms-2" style={{fontSize:"2.1vw"}}>{event.title}</strong>
          </div>
          <div className="mb-2 d-flex align-items-center">

            <Icon.PcDisplay size="2.1vw" />
            <span className='ms-2' style={{fontSize:"2vw"}}>{event.type}</span>
          </div>
          <div className="d-flex align-items-center">
            <Icon.PersonFill className="me-1" size="1.8vw" />
            <span className='fw-semibold' style={{fontSize:"1.5vw"}}>{event.message}</span>
          </div>
        </Container>
      );
    }

    // Diğer görünümler için sadece başlık göster
    return <Container className="d-flex flex-column">
      <div className="d-flex align-items-center mb-2">
        <strong className="ms-2" style={{fontSize:"1vw"}}>{event.title}</strong>
      </div>
      <div className="mb-2 d-flex align-items-center" style={{fontSize:"1vw"}}>
        {event.type}
      </div>
      {event.message}
    </Container>
  };
  

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={events} // Geçmiş etkinlikler filtrelendi
        step={30}
        views={['week', 'day']}
        onView={(view) => setView(view)}
        defaultView='day'
        defaultDate={new Date()}
        showMultiDayTimes={true}
        min={minTime} // Günün en erken saati
        max={maxTime} // Günün en geç saati
        formats={{
          timeGutterFormat: 'HH:mm',
          dayHeaderFormat: 'DD MMMM dddd', // Tarih formatını "14 Kasım Perşembe" olarak ayarla
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'DD MMMM', culture)} - ${localizer.format(end, 'DD MMMM', culture)}`,
          eventTimeRangeFormat: ({ start, end }) => {
            return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
          },
        }}
        components={{
          event: EventComponent, // Özel etkinlik bileşeni
        }}
        messages={{
          today: 'Bugün',
          previous: 'Önceki',
          next: 'Sonraki',
          day: 'Günlük',
          week: 'Hafta',
          month: 'Ay',
          agenda: 'Ajanda',
          date: 'Tarih',
          time: 'Saat',
          event: 'Etkinlik',
          work_week: "Haftalık",
        }}
      />
    </div>
  );
};

export default ClassCalendarStudent;
