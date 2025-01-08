import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { RRule } from "rrule";
import { getLecturesByRoomId } from '../utils/LectureApiService';

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);

const ClassCalendarStudent = ({ roomId }) => {
  const [view, setView] = useState('day');
  const [lectures, setLectures] = useState([])
  const [clubs, setClubs] = useState([])
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getLecturesByRoomId(roomId);
      setLectures(events.lectures)
      setClubs(events.clubEvents)
    };

    fetchEvents();
  }, []);

  const getDayOfWeek = (day) => {
    const days = {
      Monday: RRule.MO,
      Tuesday: RRule.TU,
      Wednesday: RRule.WE,
      Thursday: RRule.TH,
      Friday: RRule.FR,
      Saturday: RRule.SA,
      Sunday: RRule.SU,
    };
    return days[day];
  };
  console.log(lectures)
  // JSON etkinliklerini RRule formatına dönüştür
  const transformEvents = (events) => {
    return events.map((event) => {
      const startTimeParts = event.startTime.split(":");
      const endTimeParts = event.endTime.split(":");

      // Başlangıç ve bitiş tarihleri
      const dtstart = new Date(2024, 8, 16, parseInt(startTimeParts[0]), parseInt(startTimeParts[1])); // 16 Eylül 2024
      const until = new Date(2026, 11, 27, parseInt(endTimeParts[0]), parseInt(endTimeParts[1])); // 27 Aralık 2024

      const rule = new RRule({
        freq: RRule.WEEKLY, // Haftalık tekrarlama
        dtstart: dtstart, // Başlangıç tarihi
        until: until, // Bitiş tarihi
        byweekday: [getDayOfWeek(event.dayOfWeek)], // Belirtilen gün
      });


      // Etkinlikleri oluştur
      return rule.all().map((date) => ({
        title: event.lectureName,
        start: date,
        end: new Date(moment(date).set({ hour: parseInt(endTimeParts[0]), minute: parseInt(endTimeParts[1]) }).toDate()),
        type: event.departmentName,
        message: event.teacherName
      }));
    }).flat(); // Etkinlikleri düzleştir
  };


  const clubEvent = Array.isArray(clubs)
    ? clubs.map((item) => ({
      title: item.clubName,
      start: new Date(`${item.eventDate.split("T")[0]}T${item.startTime}`),
      end: new Date(`${item.eventDate.split("T")[0]}T${item.endTime}`),
      clubTitle: item.title,
      eventType: "Kulüp etkinliği"
    }))
    : []

    console.log(clubEvent)
  const events = transformEvents(lectures);

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
            <Icon.Stack size="1.7vw" />
            <strong className="ms-2" style={{ fontSize: "1.7vw" }}>{event.title}</strong>
          </div>
          {event.clubTitle && <div className="d-flex align-items-center">
            <Icon.LightningChargeFill className="me-1" size="1.2vw" />
            <span className='fw-semibold' style={{ fontSize: "1.2vw" }}>{event.clubTitle}</span>
          </div>}
          {event.eventType && <div className="d-flex align-items-center mt-2">
            <span className='fw-semibold' style={{ fontSize: "1.2vw" }}>{event.eventType}</span>
          </div>}
        </Container>
      );
    }

    // Diğer görünümler için sadece başlık göster
    return <Container className="d-flex flex-column">
      <div className="d-flex align-items-center mb-2">
        <strong className="ms-2" style={{ fontSize: "1vw" }}>{event.title}</strong>
      </div>
      <strong style={{ fontSize: "0.9vw" }} className='mt-2'>{event.clubTitle}</strong>
    </Container>
  };


  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={[...events, ...clubEvent]} // Geçmiş etkinlikler filtrelendi
        step={30}
        views={{ work_week: true, day: true }}
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