import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { RRule } from "rrule";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { getLecturesByStudentId } from "../utils/LectureApiService";

// Localizer ayarı
const localizer = momentLocalizer(moment);
let studentId = 1
const StudentSchedule = () => {
  const [schedule, setSchedule] = useState([])
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getLecturesByStudentId(studentId);
      setSchedule(events.schedule) // Veriyi burada işleyebilirsiniz.
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

  // JSON etkinliklerini RRule formatına dönüştür
  const transformEvents = (events) => {
    return events.map((event) => {
      const startTimeParts = event.startTime.split(":");
      const endTimeParts = event.endTime.split(":");

      // Başlangıç ve bitiş tarihleri
      const dtstart = new Date(2024, 8, 16, parseInt(startTimeParts[0]), parseInt(startTimeParts[1])); // 16 Eylül 2024
      const until = new Date(2024, 11, 27, parseInt(endTimeParts[0]), parseInt(endTimeParts[1])); // 27 Aralık 2024

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
        message: event.roomName
      }));
    }).flat(); // Etkinlikleri düzleştir
  };
  const events = transformEvents(schedule);



  const minTime = new Date();
  const maxTime = new Date();
  minTime.setHours(8, 0, 0); // Minimum saati 08:00 olarak ayarla
  maxTime.setHours(22, 0, 0); // Maksimum saati 22:00 olarak ayarla

  const EventComponent = ({ event }) => {
    // Sadece "week" görünümünde özelleştirilmiş tasarımı göster

    return (
      <Container className="d-flex flex-column align-items-center ">
        <div className="d-flex align-items-center ">
          <span className="fw-bolder lh-sm" style={{ fontSize: "1.1vw" }}>{event.title}</span>
        </div>
        <div className=" d-flex align-items-center">
          <span className='fw-semibold' style={{ fontSize: "1.1vw" }}>{event.message}</span>
        </div>


      </Container>
    );



  };


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
