import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);

const ClassCalendar = ({ onDataSubmit, lessonName, events, setEvents  } ) => {



  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    if (start >= now) { // Sadece gelecekteki etkinlikleri kabul et
      const newEvent = {
        title: lessonName, // lessonName'i etkinlik başlığı olarak ata
        start,
        end,
        type:"Ek ders"
      };
      setEvents([...events, newEvent]); // Yeni etkinliği events dizisine ekle

      // Seçilen tarihi ve saatleri üst bileşene ilet
      onDataSubmit({
        date: moment(start).format('YYYY-MM-DD'), // 'YYYY-MM-DD' formatında
        startTime: moment(start).format('HH:mm'), // 'HH:mm' formatında
        endTime: moment(end).format('HH:mm'),     // 'HH:mm' formatında
      });
    
    } else {
      alert('Geçmiş bir zamana etkinlik ekleyemezsiniz.');
    }
  };
console.log(lessonName)
console.log(events)
  const minTime = new Date();
  const maxTime = new Date();
  minTime.setHours(8, 0, 0); // Minimum saati 08:00 olarak ayarla
  maxTime.setHours(22, 0, 0); // Maksimum saati 22:00 olarak ayarla

  console.log(events)
  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={events} // Tüm etkinlikleri göster
        step={30}
        views={['day', 'week']}
        defaultView="day"
        selectable={true} // Takvimde aralık seçimi yapılabilsin
        onSelectSlot={handleSelectSlot} // Slot seçimi fonksiyonu
        showMultiDayTimes={true}
        min={minTime}
        max={maxTime}
        formats={{
          timeGutterFormat: 'HH:mm',
          dayHeaderFormat: 'DD MMMM dddd', // Tarih formatını "14 Kasım Perşembe" olarak ayarla
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'DD MMMM', culture)} - ${localizer.format(end, 'DD MMMM', culture)}`,
          eventTimeRangeFormat: ({ start, end }) =>
            `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
        }}
        components={{
          event: ({ event }) => (
            <span>
              <strong>{event.title}</strong> - {event.type} {/* Etkinlik adı ve türü */}
            </span>
          ),
        }}
        messages={{
          today: 'Bugün',
          previous: 'Dün',
          next: 'Yarın',
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

export default ClassCalendar;
