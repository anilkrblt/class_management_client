import React from 'react';
import { ListGroup, Card, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const StudentExam = () => {

    let schedule = [
        {
          logo: "/tu_logo.jpg",
          day: "Pazartesi",
          date: new Date (2024,10,8),
          lessons: { class: "L208", lesson: "Makine Öğrenmesi", hours: "13:00" },
        },
        {
          logo: "/tu_logo.jpg",
          day: "Salı",
          date: new Date (2024,10,9),
          lessons: { class: "L210", lesson: "Yapay Zeka", hours: "14:00" },
        },
        {
          logo: "/tu_logo.jpg",
          day: "Çarşamba",
          date: new Date (2024,10,10),
          lessons: { class: "L305", lesson: "Veri Yapıları", hours: "10:00 " },
        },
        {
            logo: "/tu_logo.jpg",
            day: "Perşembe",
            date: new Date (2024,10,11),
          },
        {
            logo: "/tu_logo.jpg",
            day: "Cuma",
            date: new Date (2024,10,12),
            lessons: { class: "L305", lesson: "Veri Yapıları", hours: "10:00" },
          },
      ];

    return <Container style={{width: "25rem"}}>
    
    <h2 className="my-4 text-center">Sınav programı</h2>
    <ListGroup style={{ width: '25rem' }}>
      {schedule.map((item, index) => (
        <Card 
        key={index} 
        className="my-1"
        style={{ backgroundColor: index % 2 === 0 ? '#e6f7e4' : 'white' }}>
          <Card.Body className="d-flex align-items-center">
       
            <Image 
                src= {item.logo}
                roundedCircle
                width={50} 
                className='me-3'
         />
            <div>
              <Card.Title className="text-start">{item.day} <span className='fs-6 text-secondary'>{item.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}</span>
              </Card.Title>
              <Card.Text className="text-start">
              {item.lessons ? `${item.lessons.class} - ${item.lessons.lesson} - ${item.lessons.hours}`
                            : "Sınavınız yok"}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      ))}
    </ListGroup>

    </Container>
}

export default StudentExam