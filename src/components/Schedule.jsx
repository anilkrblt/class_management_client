import React from 'react';
import { ListGroup, Card, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const Schedule = () => {

    let schedule = [
        {
          logo: "/tu_logo.jpg",
          day: "Pazartesi",
          lessons: { class: "L208", lesson: "Makine Öğrenmesi", hours: "13:00 - 14:00" },
        },
        {
          logo: "/tu_logo.jpg",
          day: "Salı",
          lessons: { class: "L210", lesson: "Yapay Zeka", hours: "14:00 - 15:00" },
        },
        {
          logo: "/tu_logo.jpg",
          day: "Çarşamba",
          lessons: { class: "L305", lesson: "Veri Yapıları", hours: "10:00 - 11:00" },
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

    return <Container style={{width: "25rem"}}>
    
    <h2 className="my-4 text-center">Ders Programı</h2>
    <ListGroup style={{ width: '25rem' }}>
      {schedule.map((item, index) => (
        <Card 
        key={index} 
        className="my-1"
        style={{ backgroundColor: index % 2 === 0 ? '#fef7ff' : 'white' }}>
          <Card.Body className="d-flex align-items-center">
       
            <Image 
                src= {item.logo}
                roundedCircle
                width={50} 
                className='me-3'
         />
            <div>
              <Card.Title className="text-start">{item.day}</Card.Title>
              <Card.Text className="text-start">
                {item.lessons.class} - {item.lessons.lesson}  {item.lessons.hours}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      ))}
    </ListGroup>

    </Container>
}