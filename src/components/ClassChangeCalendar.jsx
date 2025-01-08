import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getLecturesByRoomId } from '../utils/LectureApiService';
import { RRule } from "rrule";

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);


const ClassChangeCalendar = ({ onDataSubmit, lessonName, selectedCard }) => {


  const [lectures, setLectures] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getLecturesByRoomId(selectedCard.roomId);
        setLectures(events?.lectures || []); // Eğer lectures undefined ise boş bir dizi ata
      } catch (error) {
        console.error("Veriler alınamadı:", error);
        setLectures([]); // Hata durumunda da boş dizi ata
      }
    };

    fetchEvents();
  }, [selectedCard]);

  const [message, setMessage] = useState(false)
  const [message2, setMessage2] = useState(false)
  const [newEvent, setNewEvent] = useState(null)

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();



    // Geçmiş bir zamana etkinlik eklenemez
    if (start < now) {
      setMessage(true)
      return;
    }
    setMessage(false)
    // Çakışma kontrolü
    const hasConflict = lectureEvent.some(event => {
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


    const newLessonEvent = {
      title: lessonName,
      start,
      end,
      type: 'Seçilen ders zamanı',
    };

    //  setEvents([...events, newEvent]);
    setNewEvent(newLessonEvent)
    // Üst bileşene veri gönder
    onDataSubmit({
      date: start,
      startTime: moment(start).format('HH:mm:ss'),
      endTime: moment(end).format('HH:mm:ss'),
    });
  };



  const minTime = new Date();
  const maxTime = new Date();
  minTime.setHours(8, 0, 0); // Minimum saati 08:00 olarak ayarla
  maxTime.setHours(22, 0, 0); // Maksimum saati 22:00 olarak ayarla

  const lectureEvent = Array.isArray(lectures)
  ? lectures.map((item) => ({
    title: item.lectureName,
    start: new Date(`${item.date.split("T")[0]}T${item.startTime}`),
    end: new Date(`${item.date.split("T")[0]}T${item.endTime}`),
    departmentName: item.departmentName,
    eventType: item.teacherName
  }))
  : []
 
      

  return (
    <div style={{ height: '100vh' }}>
      {message && <p className='text-danger'>Geçmiş bir zamana etkinlik ekleyemezsiniz.</p>}
      {message2 && <p className='text-danger'>Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.</p>}
      {selectedCard?.roomId === undefined
      ? <p className='text-center fw-semibold'>Lütfen sınıf seçiniz</p>
      :  <Calendar
      localizer={localizer}
      events={[...lectureEvent, newEvent]} // Tüm etkinlikleri göster
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
            <strong style={{ fontSize: "1.5vw" }}>{event.title}</strong> - {event.type} {/* Etkinlik adı ve türü */}
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
        work_week: "Haftalık",
      }}
    />
    }
      
     
    </div>
  );
};

export default ClassChangeCalendar;
