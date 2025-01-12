import React, { useState } from "react";
import CreateExamCalendar from "./CreateExamCalendar";
import { Button, Container, Accordion, Card, Row, Col } from "react-bootstrap";
import { createExams } from "../utils/CreateExams";

const CreateExam = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [exams, setExams] = useState({});

  const createExamsSchedule = async () => {
    const x = await createExams(selectedDates);
    setExams(x);
    console.log(x);
  };

  // DepartmentName'e göre grupla
  const groupByDepartment = (data) => {
    return data.reduce((acc, current) => {
      const { departmentName } = current;
      if (!acc[departmentName]) {
        acc[departmentName] = [];
      }
      acc[departmentName].push(current);
      return acc;
    }, {});
  };

  // Grade'e göre grupla
  const groupByGrade = (data) => {
    return data.reduce((acc, current) => {
      const { grade } = current;
      if (!acc[grade]) {
        acc[grade] = [];
      }
      acc[grade].push(current);
      return acc;
    }, {});
  };

  const groupedExams = exams.planning ? groupByDepartment(exams.planning) : {};

  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <Container>
      <h3>Sınav Takvimi Oluştur</h3>
      <Button onClick={()=>setShowCalendar(!showCalendar)}>Sınav takvimi oluştur</Button>
      {showCalendar && <>
        <Button onClick={createExamsSchedule}>Sınav takvimi oluştur</Button>
        <CreateExamCalendar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />

      </>}


      {Object.keys(exams).length === 0 ? (
        <p>Sınav takvimi henüz oluşturulmadı.</p>
      ) : (
        <Accordion>
          {Object.keys(groupedExams).map((departmentName, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{departmentName}</Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  {Object.keys(groupByGrade(groupedExams[departmentName])).map(
                    (grade, subIndex) => (
                      <Accordion.Item
                        eventKey={`${index}-${subIndex}`}
                        key={subIndex}
                      >
                        <Accordion.Header>{grade}. Sınıf</Accordion.Header>
                        <Accordion.Body>
                          {groupByGrade(
                            groupedExams[departmentName]
                          )[grade].map((plan, idx) => (
                            <div key={idx}>
                              <Card
                                className="mt-2"
                                style={{
                                  backgroundColor: idx % 2 === 0 ? "#e6f7e4" : "transparent",
                                }}
                              >

                                <Card.Body>
                                  <Row className="justify-content-between text-center">
                                    <Col md={2} >{plan.lectureCode}</Col>
                                    <Col md={4}  >{plan.lectureName}</Col>

                                    <Col md={2}  >{plan.date}</Col>
                                    <Col md={2}  >{plan.startTime}-{plan.endTime}</Col>
                                    <Col md={2}  >{plan.roomNames}</Col>


                                  </Row>
                                </Card.Body>
                              </Card>
                            </div>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    )
                  )}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
};

export default CreateExam;
