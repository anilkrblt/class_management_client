import React, { useEffect } from "react";
import { ListGroup, Card, Container, Accordion } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import * as Icon from 'react-bootstrap-icons';
import { useState } from "react";
import { getLecturesByStudentId } from "../utils/LectureApiService";
let id= 1
const Schedule = () => {

  const [schedule, setSchedule] = useState([])

    useEffect(() => {
      const fetchClassrooms = async () => {
        try {
          const data = await getLecturesByStudentId(id);
          setSchedule(data.schedule);
        } catch (err) {
          console.error("Dersler yüklenirken hata oluştu:", err);
        }
      };
  
      fetchClassrooms();
    }, []);

// Günlerin Türkçe çevirisi
const dayMapping = {
  Monday: "Pazartesi",
  Tuesday: "Salı",
  Wednesday: "Çarşamba",
  Thursday: "Perşembe",
  Friday: "Cuma",

};

// Dönüşüm işlemi
const scheduleMap = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
].map((day) => {
  const lessonsForDay = schedule
    .filter((item) => item.dayOfWeek === day)
    .map((lesson) => ({
      class: lesson.roomName,
      lesson: lesson.lectureName,
      hours: `${lesson.startTime.slice(0, 5)} - ${lesson.endTime.slice(0, 5)}`,
    }));

  return {
    logo: "/tu_logo.jpg",
    day: dayMapping[day],
    lessons: lessonsForDay,
  };
});

console.log(scheduleMap);


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
  
  return (
    <Container className="bg-light rounded-4 schedule px-2 shadow my-4">
      <h2 className=" text-center">Ders Programı</h2>
      <ListGroup className="ms-1">

        <Accordion className="custom-accordion">
          {scheduleMap.map((item, index) => (
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
