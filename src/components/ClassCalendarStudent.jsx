import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);

const ClassCalendarStudent = () => {
  const [events, setEvents] = useState([
    {
      title: 'Toplantı',
      start: new Date(2024, 10, 14, 10, 0), // 14 Kasım 2024, 10:00
      end: new Date(2024, 10, 14, 11, 0),
      type: "Ders"
    },
    {
      title: 'Yazılım Eğitimi',
      start: new Date(2024, 10, 14, 13, 30), // 14 Kasım 2024, 13:30
      end: new Date(2024, 10, 14, 15, 0),
      type: "Telafi dersi"
    },
    {
      title: 'Yazılım Eğitimi',
      start: new Date(2024, 10, 14, 16, 0), // 14 Kasım 2024, 13:30
      end: new Date(2024, 10, 14, 17, 30),
      type: "Etkinlik"
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

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={futureEvents} // Geçmiş etkinlikler filtrelendi
        step={30}
        views={['day', 'week']}
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
        messages={{
          today: 'Bugün',
          previous: 'Önceki',
          next: 'Sonraki',
          day: 'Gün',
          week: 'Hafta',
          month: 'Ay',
          agenda: 'Ajanda',
          date: 'Tarih',
          time: 'Saat',
          event: 'Etkinlik',
        }}
      />
    </div>
  );
};

export default ClassCalendarStudent;
