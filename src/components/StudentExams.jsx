import React from 'react';
import { ListGroup, Card, Container, Accordion } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import * as Icon from 'react-bootstrap-icons';

const StudentExams = () => {

    let schedule = [
        {
          day: "Pazartesi",
          date: new Date (2024,10,8),
          lessons: [{ class: "L208", lesson: "Makine Öğrenmesi", hours: "13:00" },{ class: "L208", lesson: "Makine Öğrenmesi", hours: "13:00" },]
        },
        {
          day: "Salı",
          date: new Date (2024,10,9),
          lessons:[ { class: "L210", lesson: "Yapay Zeka", hours: "14:00" },]
        },
        {
          day: "Çarşamba",
          date: new Date (2024,10,10),
          lessons:[ { class: "L305", lesson: "Veri Yapıları", hours: "10:00 " },]
        },
        {
            
            day: "Perşembe",
            date: new Date (2024,10,11),
            lessons: []
          },
        {
            day: "Cuma",
            date: new Date (2024,10,12),
            lessons: [{ class: "L305", lesson: "Veri Yapıları", hours: "10:00" },]
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
      
    return <Container
    className='bg-light rounded-4 schedule px-2'
    >
    
    <h2 className="my-4 text-center">Sınav Programı</h2>
    <ListGroup>
    <Accordion className="custom-accordion">
          {schedule.map((item, index) => (
            item.lessons.length > 1
              ? <Accordion.Item eventKey={index.toString()} key={index} className="border-0">
                <Card
                  className="my-2"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#e6f7e4" : "white",
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
                      <Card.Title className="text-start">{item.day} <span className='fs-6 text-secondary'>{item.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}</span>
                      </Card.Title>
                        <Card.Text className="text-start">
                         <Icon.PlusSquare/> {item.lessons.length} adet sınavınız var
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
                style={{ backgroundColor: index % 2 === 0 ? '#e6f7e4' : 'white' }}>
                <Card.Body className="d-flex align-items-center">

                  <Image
                     src={`https://cdn.auth0.com/avatars/${turkishToLatin(item.day[0])}.png`} 
                    roundedCircle
                    width={50}
                    className='me-3'
                  />
                  <div>
                  <Card.Title className="text-start">{item.day} <span className='fs-6 text-secondary'>{item.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}</span>
                  </Card.Title>
                    <Card.Text className="text-start align-items-center justify-content-between">
                      {item.lessons.length !== 0 ? (
                        <>
                          <Icon.Building /> {item.lessons[0].class} <Icon.JournalText/> {item.lessons[0].lesson} <Icon.Clock/> {item.lessons[0].hours}
                         
                        </>
                      ) : (
                        <>
                        <Icon.XSquare/> Sınavınız yok</>
                      )}
                    </Card.Text>

                  </div>
                </Card.Body>
              </Card>
          ))}
        </Accordion>
    </ListGroup>

    </Container>
}

export default StudentExams