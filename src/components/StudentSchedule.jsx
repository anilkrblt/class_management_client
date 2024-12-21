import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { RRule } from "rrule";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

// Localizer ayarı
const localizer = momentLocalizer(moment);

// RRule ile tekrar eden etkinlikleri oluşturma fonksiyonu
const generateRecurringEvents = (title, start, end, rule) => {
  const rrule = new RRule({
    ...rule,
    dtstart: start, // Başlangıç zamanı
  });
  return rrule.all().map(date => ({
    title,
    start: new Date(date),
    end: new Date(moment(date).add(moment(end).diff(moment(start), "minutes"), "minutes").toISOString()),
  }));
};

// Tekrarlama kuralları ve etkinlik tanımları
const baseEvents = [
  {
    title: "Makine Öğrenmesi",
    start: moment().day(2).hour(13).minute(30).toDate(), // Salı 13:30
    end: moment().day(2).hour(15).minute(30).toDate(),   // Salı 15:30
    rule: { freq: RRule.WEEKLY, interval: 1, count: 12 }, // 12 hafta boyunca her hafta
    instructor: "Ali Duru",
    class: "L208"
  },
  {
    title: "Mobil Uygulama Geliştirme",
    start: moment().day(1).hour(10).minute(30).toDate(), // Pazartesi 13:30
    end: moment().day(1).hour(16).minute(30).toDate(),   // Pazartesi 16:30
    rule: { freq: RRule.WEEKLY, interval: 1, count: 12 }, // 12 hafta boyunca her hafta
    instructor: "Ali Duru",
    class: "L208"
  },
  {
    title: "Kriptoloji",
    start: moment().day(2).hour(9).minute(30).toDate(),  // Salı 09:30
    end: moment().day(2).hour(12).minute(0).toDate(),    // Salı 12:00
    rule: { freq: RRule.WEEKLY, interval: 1, count: 12 }, // 12 hafta boyunca her hafta
    instructor: "Ali Duru",
    class: "L208"
  },
];

// Tüm tekrar eden etkinlikleri oluştur
const events = baseEvents.flatMap(event =>
  generateRecurringEvents(event.title, event.start, event.end, event.rule)
);

const minTime = new Date();
const maxTime = new Date();
minTime.setHours(8, 0, 0); // Minimum saati 08:00 olarak ayarla
maxTime.setHours(22, 0, 0); // Maksimum saati 22:00 olarak ayarla

const EventComponent = ({ event }) => {
  // Sadece "week" görünümünde özelleştirilmiş tasarımı göster

  return (
    <Container className="d-flex flex-column align-items-center ">
      <div className="d-flex align-items-center ">
       <span className="fs-5 fw-semibold">{event.title}</span> 
      </div>
      <div className=" d-flex align-items-center mt-2">
        <span className='fs-5 fw-semibold'>L208 Tolga Sakallı{event.instructor}</span>
      </div>
     
    </Container>
  );



};

const StudentSchedule = () => {
  return (
    <Calendar
      localizer={localizer}
      events={events}
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
