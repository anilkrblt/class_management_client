import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe lokali içe aktar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getLecturesByRoomId } from '../utils/LectureApiService';
import { RRule } from "rrule";
import { Container } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

// Moment.js'i Türkçe kullanacak şekilde ayarla
moment.locale('tr');

// Moment.js'yi takvime bağlamak için
const localizer = momentLocalizer(moment);

const ClubEventCreateCalendar = ({selectedCard, setSelectedTime } ) => {


 const [view, setView] = useState('day');

 const [message, setMessage] = useState (false)
 const [message2, setMessage2] = useState (false)
 const [message3, setMessage3] = useState (false)
 const [selectedEvent, setSelectedEvent] = useState(null)

 const [lectures, setLectures] = useState([])
  const [clubs, setClubs] = useState([])


 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const events = await getLecturesByRoomId(selectedCard.roomId);
      setLectures(events?.lectures || []); // Eğer lectures undefined ise boş bir dizi ata
      setClubs(events?.clubEvents)
    } catch (error) {
      console.error("Veriler alınamadı:", error);
      setLectures([]); // Hata durumunda da boş dizi ata
    }
  };

  fetchEvents();
}, [selectedCard]);


const lectureEvent = Array.isArray(lectures)
? lectures.map((item) => ({
  title: item.lectureName,
  start: new Date(`${item.date.split("T")[0]}T${item.startTime}`),
  end: new Date(`${item.date.split("T")[0]}T${item.endTime}`),
  departmentName: item.departmentName,
  eventType: item.teacherName
}))
: []
   
const clubEvent = Array.isArray(clubs)
? clubs.map((item) => ({
  title: item.clubName,
  start: new Date(`${item.eventDate.split("T")[0]}T${item.startTime}`),
  end: new Date(`${item.eventDate.split("T")[0]}T${item.endTime}`),
  clubTitle: item.title,
  eventType: "Kulüp etkinliği"
}))
: []


  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    
  
    // Geçmiş bir zamana etkinlik eklenemez
    if (start < now) {
      //alert('Geçmiş bir zamana etkinlik ekleyemezsiniz.');
      setMessage(true)
      return;
    }
    setMessage(false)
  
    const minDate = new Date(now);
    minDate.setDate(now.getDate() + 3); // 3 gün sonrası
    if (start < minDate) {
      setMessage3(true); // Yeni bir hata durumu göstermek için
      return;
    }
    setMessage3(false);

    // Çakışma kontrolü
    const hasConflict = [...lectureEvent, ...clubEvent].some(event => {
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




    
    const EventComponent = ({ event }) => {
      // Sadece "week" görünümünde özelleştirilmiş tasarımı göster
     if (view === 'day') {
           return (
             <Container className="d-flex flex-column align-items-center">
               <div className="d-flex align-items-center mb-2">
                {!event.clubTitle ? <Icon.Stack size="1.2vw" /> : <Icon.LightningChargeFill size="1.2vw"/> } 
                 <strong className="ms-2" style={{ fontSize: "1.1vw" }}>{event.title} {event.clubTitle && `Kulüp Etkinliği - ${event.clubTitle} `}</strong>
               </div>
               {event.clubTitle && <div className="d-flex align-items-center">
                 <Icon.LightningChargeFill className="me-1" size="1.2vw" />
                 <span className='fw-semibold' style={{ fontSize: "1.2vw" }}>{event.clubTitle}</span>
               </div>}
               {event.eventType && <div className="d-flex align-items-center mt-2">
                <Icon.PersonFill size="1.2vw"/>
                <span className='fw-semibold' style={{ fontSize: "1vw" }}>{`${event.eventType} `}  
                 {event.departmentName === "Bilgisayar Mühendisliği" &&   <Icon.PcDisplay size="1.1vw"/>}
                 {event.departmentName === "Makine Mühendisliği" && <Icon.GearFill size="1.1vw"/>}
                 {event.departmentName === "Genetik ve Biyomühendislik" && <span class="material-symbols-outlined" style={{fontSize:"1.1vw"}}>genetics</span>}
                 {event.departmentName === "Gıda Mühendisliği" && <span class="material-symbols-outlined" style={{fontSize:"1.1vw"}}>fastfood</span>} {` `}
                 {event.departmentName === "Elektrik - Elektronik Mühendisliği" && <Icon.LightningFill size="1.1vw"/>}
                 {event.departmentName}
                 </span>
               </div>
               }

             
               
             </Container>
           );
         }
        else return (
              <Container className="d-flex flex-column align-items-center ">
                <div className="d-flex align-items-center ">
                  <span className="fw-bolder lh-sm">{event.title}</span>
                </div>
                
        
        
        
              </Container>)
        
        }

        const eventPropGetter = (event) => {
          let className = '';
        
          // Her bölüm için farklı sınıf
          switch (event.departmentName) {
            case 'Bilgisayar Mühendisliği':
              className = 'event-cs'; // Bilgisayar Mühendisliği için sınıf
              break;
            case 'Makine Mühendisliği':
              className = 'event-me'; // Makine Mühendisliği için sınıf
              break;
            case 'Genetik ve Biyomühendislik':
              className = 'event-bio'; // Genetik ve Biyomühendislik için sınıf
              break;
            case 'Gıda Mühendisliği':
              className = 'event-food'; // Gıda Mühendisliği için sınıf
              break;
            case 'Elektrik - Elektronik Mühendisliği':
              className = 'event-ee'; // Elektrik-Elektronik Mühendisliği için sınıf
              break;
            default:
              className = 'event-default'; // Varsayılan sınıf
          }
        
          // Kulüp etkinlikleri için farklı sınıf
          if (event.eventType === 'Kulüp etkinliği') {
            className = 'event-club';
          }
        
          return { className }; // Dinamik sınıf adı döndür
        };

  return (
    <div style={{ height: '100vh' }}>
      {message && <p className='text-danger fw-semibold'>Geçmiş bir zamana etkinlik ekleyemezsiniz.</p>}
      {message2 && <p className='text-danger fw-semibold'>Seçtiğiniz zaman aralığında başka bir etkinlik bulunuyor.</p>}
      {message3 && <p className='text-danger fw-semibold'>Bugünden en az 3 gün sonrasını seçmelisiniz.</p>}
      {selectedCard?.roomId=== undefined 
      ? <p className='text-center fw-semibold'>Lütfen sınıf seçiniz</p>
      : <Calendar
      localizer={localizer}
      events={[...lectureEvent, ...clubEvent  , selectedEvent]} // Tüm etkinlikleri göster
      step={30}
      onView={(view) => setView(view)}
      views={{ work_week: true, day: true }}
      defaultView="day"
      selectable={true} // Takvimde aralık seçimi yapılabilsin
      onSelectSlot={handleSelectSlot} // Slot seçimi fonksiyonu
      showMultiDayTimes={true}
      eventPropGetter={eventPropGetter}
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
        event: EventComponent, // Özel etkinlik bileşeni
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
      }
    </div>
  );
};

export default ClubEventCreateCalendar;
