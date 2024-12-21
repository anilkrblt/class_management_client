import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);

const ClubEventCreateCalendar = ({ setSelectedTime } ) => {

    const [events, setEvents] = useState([
        {
          title: 'Toplantı',
          start: new Date(2024, 10, 14, 10, 0), // 14 Kasım 2024, 10:00
          end: new Date(2024, 10, 14, 11, 0),
          type: 'Ders',
        },
        {
          title: 'Yazılım Eğitimi',
          start: new Date(2024, 10, 14, 13, 30), // 14 Kasım 2024, 13:30
          end: new Date(2024, 10, 14, 15, 0),
          type: 'Telafi dersi',
        },
        {
          title: 'Yazılım Eğitimi',
          start: new Date(2024, 10, 14, 16, 0), // 14 Kasım 2024, 16:00
          end: new Date(2024, 10, 14, 17, 30),
          type: 'Etkinlik',
        },
      ]);
    

 const [message, setMessage] = useState (false)
 const [message2, setMessage2] = useState (false)
 const [selectedEvent, setSelectedEvent] = useState(null)

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
  
    // Geçmiş bir zamana etkinlik eklenemez
    if (start < now) {
      //alert('Geçmiş bir zamana etkinlik ekleyemezsiniz.');
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
    console.log(start)

   // setSelectedEvent({start:start , end:end , title: "seçilen"})
  
    // Yeni etkinlik ekleme
 
  
    // const newEvent = {
    //   title: lessonName,
    //   start,
    //   end,
    //   type: 'Ek ders',
    // };
  
    // setEvents([...events, newEvent]);
  


  setSelectedEvent({start:start , end:end , title: "Seçtiğiniz zaman"})
  setSelectedTime({start:start, end:end})
  };
  
  

  const minTime = new Date();
  const maxTime = new Date();
  minTime.setHours(8, 0, 0); // Minimum saati 08:00 olarak ayarla
  maxTime.setHours(22, 0, 0); // Maksimum saati 22:00 olarak ayarla

  
  return (
    <div style={{ height: '100vh' }}>
      {message && <p className='text-danger'>Geçmiş bir zamana etkinlik ekleyemezsiniz.</p>}
      {message2 && <p className='text-danger'>Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.</p>}

      <Calendar
        localizer={localizer}
        events={[...events, selectedEvent]} // Tüm etkinlikleri göster
        step={30}
        views={{ work_week: true, day: true }}
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
              <strong>{event.title}</strong>
            </span>
          ),
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
          work_week: "Haftalık",
        }}
      />
    </div>
  );
};

export default ClubEventCreateCalendar;
