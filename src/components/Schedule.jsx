import React, { useContext, useEffect } from "react";
import { ListGroup, Card, Container, Accordion } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import * as Icon from 'react-bootstrap-icons';
import { useState } from "react";
import { getLecturesByStudentId, getScheduleByInstructorId } from "../utils/LectureApiService";
import { UserContext } from "./UserContext";

const Schedule = () => {
  const now = new Date();
  const { userType, userId} = useContext(UserContext);
  const [schedule, setSchedule] = useState([])

    useEffect(() => {
      const fetchClassrooms = async () => {
        try {
          if(userType === "student") {
            const data = await getLecturesByStudentId(userId);
            setSchedule(data.schedule);
          }
          if(userType === "instructor") {
            const data = await getScheduleByInstructorId(userId);
            setSchedule(data.schedule);
          }
         
   
        } catch (err) {
          console.error("Dersler yüklenirken hata oluştu:", err);
        }
      };
  
      fetchClassrooms();
    }, []);

console.log(schedule)
  function turkishToLatin(str) {
    const map = {
      'ç': 'c',
      'ğ': 'g',
      'ı': 'i',
      'İ': 'I',
      'ö': 'o',
      'ş': 's',
      'ü': 'u',
      'Ç': 'c',
      'Ö': 'o',
      'Ş': 's', 
      'Ğ': 'g', 
      'Ü': 'u', 
    };
  
    return str.replace(/[çğıİöşüÇÖŞĞÜ]/g, match => map[match] || match).toLowerCase();
  }

  function getWeekDays(date) {
    const currentDate = new Date(date); // Girilen tarihi bir Date nesnesine çevir
    const dayOfWeek = currentDate.getDay(); // Haftanın gününü al (0: Pazar, 1: Pazartesi, ..., 6: Cumartesi)
  
    // Pazartesiye gitmek için gereken gün sayısı
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
    // Pazartesi tarihini hesapla
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() + diffToMonday);
  
    // Pazartesiden itibaren diğer günleri ekle
    const weekdays = [];
    for (let i = 0; i < 5; i++) { // Pazartesi'den Cuma'ya kadar
      const day = new Date(monday);
      day.setDate(monday.getDate() + i); // Günleri doğru şekilde al
      weekdays.push(day.toISOString().split('T')[0]); // YYYY-MM-DD formatında ekle
    }
  
    return weekdays;
}


  const weekDays = getWeekDays(now)
  console.log(weekDays)
  function getLecturesForWeek(weekdays, schedule) {
    // Her gün için o güne ait dersleri filtrele
    return weekdays.map((weekday) => {
      const lecturesForDay = schedule.filter((lecture) => {
        // Tarih formatlarını karşılaştırmak için normalize et
        const lectureDate = new Date(lecture.date).toISOString().split("T")[0];
        return lectureDate === weekday; // Dersin tarihi, günle eşleşiyorsa dahil et
      });
  
      // Günün derslerini döndür
      return {
        day: new Date(weekday).toLocaleDateString("tr-TR", { weekday: "long" }),
        lessons: lecturesForDay.map((lecture) => ({
          class: lecture.roomName,
          lesson: `${lecture.lectureName}`,
          hours: `${lecture.startTime.slice(0, 5)} - ${lecture.endTime.slice(0, 5)}`,
        })),
      };
    });
  }

  const weeklySchedule = getLecturesForWeek(weekDays, schedule);
  
  return (
    <Container className="bg-light rounded-4 schedule px-2 shadow my-4">
      <h2 className=" text-center">Ders Programı</h2>
      <ListGroup className="ms-1">

        <Accordion className="custom-accordion">
          {weeklySchedule.map((item, index) => (
            item.lessons.length > 1
              ? <Accordion.Item eventKey={index.toString()} key={index} className="border-0">
                <Card
                  className="my-2"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fef7ff" : "white",
                  }}
                >
                  <Accordion.Header className="" >
                    <div className="d-flex align-items-center w-100 ">
                      <Image
                        src={`https://cdn.auth0.com/avatars/${turkishToLatin(item.day[0])}.png`} 
                        roundedCircle
                        width={50}
                        className="me-3"
                      />
                      <div>
                        <Card.Title className="text-start">{item.day}</Card.Title>
                        <Card.Text className="text-start">
                         <Icon.PlusSquare/> {item.lessons.length} adet dersiniz var
                        </Card.Text>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="px-3 py-2">
                    {item.lessons.map((lesson, idx) => (
                      <Card.Text className="text-start" key={idx}>
                        {lesson.lesson.length === 0 && <h2>Ders yok</h2>}  <Icon.Building /> {lesson.class} <Icon.JournalText/> {lesson.lesson} <Icon.Clock/> {lesson.hours}
                      </Card.Text>
                    ))}
                  </Accordion.Body>
                </Card>
              </Accordion.Item>
              : <Card
                key={index}
                className="my-2"
                style={{ backgroundColor: index % 2 === 0 ? '#fef7ff' : 'white' }}>
                <Card.Body className="d-flex align-items-center">

                  <Image
                    src={`https://cdn.auth0.com/avatars/${turkishToLatin(item.day[0])}.png`}
                    roundedCircle
                    width={50}
                    className='me-3'
                  />
                  <div>
                    <Card.Title className="text-start">{item.day}</Card.Title>
                    <Card.Text className="text-start align-items-center justify-content-between">
                      {item.lessons.length !== 0 ? (
                        <>
                          <Icon.Building /> {item.lessons[0].class} <Icon.JournalText/> {item.lessons[0].lesson} <Icon.Clock/> {item.lessons[0].hours}
                         
                        </>
                      ) : (
                        <>
                        <Icon.XSquare/> Dersiniz yok</>
                      )}
                    </Card.Text>

                  </div>
                </Card.Body>
              </Card>
          ))}
        </Accordion>
      </ListGroup>
    </Container>


  );

};

export default Schedule;
