import React from "react";
import { ListGroup, Card, Container, Accordion } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import * as Icon from 'react-bootstrap-icons';

const Schedule = () => {
  const schedule = [
    {
      logo: "/tu_logo.jpg",
      day: "Pazartesi",
      lessons: [
        { class: "L208", lesson: "Makine Öğrenmesi", hours: "13:00 - 14:00" },
        { class: "L208", lesson: "Makine Öğrenmesi", hours: "14:00 - 15:00" },
        { class: "L208", lesson: "Makine Öğrenmesi", hours: "14:00 - 15:00" }
      ],
    },
    {
      logo: "/tu_logo.jpg",
      day: "Salı",
      lessons: { class: "L210", lesson: "Yapay Zeka", hours: "14:00 - 15:00" },
    },
    {
      logo: "/tu_logo.jpg",
      day: "Çarşamba",
      lessons: [],
    },
    {
      logo: "/tu_logo.jpg",
      day: "Perşembe",
      lessons: { class: "L305", lesson: "Veri Yapıları", hours: "10:00 - 11:00" },
    },
    {
      logo: "/tu_logo.jpg",
      day: "Cuma",
      lessons: { class: "L305", lesson: "Veri Yapıları", hours: "10:00 - 11:00" },
    },
  ];

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
    <Container className="bg-light rounded-4 schedule px-2">
      <h2 className="my-4 text-center">Ders Programı</h2>
      <ListGroup className="ms-1">

        <Accordion className="custom-accordion">
          {schedule.map((item, index) => (
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
                          <Icon.Building /> {item.lessons.class} <Icon.JournalText/> {item.lessons.lesson} <Icon.Clock/> {item.lessons.hours}
                         
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
