import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);


const ClassChangeCalendar = ({ onDataSubmit, lessonName, } ) => {

  const [events, setEvents] = useState([
    {
      title: 'Toplantı',
      start: new Date(2024, 11, 6, 10, 0), // 14 Kasım 2024, 10:00
      end: new Date(2024, 11, 6, 11, 0),
      type: "Ders"
    },
    {
      title: 'Yazılım Eğitimi',
      start: new Date(2024, 11, 6, 13, 30), // 14 Kasım 2024, 13:30
      end: new Date(2024, 11, 6, 15, 0),
      type: "Telafi dersi"
    },
    {
      title: 'Yazılım Eğitimi',
      start: new Date(2024, 11, 7, 16, 0), // 14 Kasım 2024, 13:30
      end: new Date(2024, 11, 7, 17, 30),
      type: "Etkinlik"
    },
  ]);

   const [message, setMessage] = useState (false)
   const [message2, setMessage2] = useState (false)

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
  
    // Geçmiş bir zamana etkinlik eklenemez
    if (start < now) {
      setMessage(true)
      return;
    }
  setMessage(false)
    // Çakışma kontrolü
    const hasConflict = events.some(event => {
      return (
        (start >= event.start && start < event.end) || // Başlangıç zamanı başka bir etkinlik arasında mı?
        (end > event.start && end <= event.end) || // Bitiş zamanı başka bir etkinlik arasında mı?
        (start <= event.start && end >= event.end) // Seçim tamamen başka bir etkinliği kapsıyor mu?
      );
    });
  
    if (hasConflict) {
     // alert('Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.');
     setMessage2(true)
     return;
    }
    setMessage2(false)
    
    // Yeni etkinlik ekleme
 
  
    const newEvent = {
      title: lessonName,
      start,
      end,
      type: 'Yeni ders zamanı',
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
      {message && <p className='text-danger'>Geçmiş bir zamana etkinlik ekleyemezsiniz.</p>}
      {message2 && <p className='text-danger'>Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.</p>}
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

export default ClassChangeCalendar;
