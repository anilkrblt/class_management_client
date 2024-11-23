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
  
    // Geçmiş bir zamana etkinlik eklenemez
    if (start < now) {
      alert('Geçmiş bir zamana etkinlik ekleyemezsiniz.');
      return;
    }
  
    // Çakışma kontrolü
    const hasConflict = events.some(event => {
      return (
        (start >= event.start && start < event.end) || // Başlangıç zamanı başka bir etkinlik arasında mı?
        (end > event.start && end <= event.end) || // Bitiş zamanı başka bir etkinlik arasında mı?
        (start <= event.start && end >= event.end) // Seçim tamamen başka bir etkinliği kapsıyor mu?
      );
    });
  
    if (hasConflict) {
      alert('Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.');
      return;
    }
  
    if(!lessonName){
      lessonName = window.prompt("Ders")
    }
    // Yeni etkinlik ekleme
 
  
    const newEvent = {
      title: lessonName,
      start,
      end,
      type: 'Ek ders',
    };
  
    setEvents([...events, newEvent]);
  
    // Üst bileşene veri gönder
    onDataSubmit({
      date: moment(start).format('YYYY-MM-DD'),
      startTime: moment(start).format('HH:mm'),
      endTime: moment(end).format('HH:mm'),
    });
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
