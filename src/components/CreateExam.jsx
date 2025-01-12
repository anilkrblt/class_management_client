import React, { useState } from "react";
import CreateExamCalendar from "./CreateExamCalendar";
import { Button, Container, Accordion, Card, Row, Col, Form } from "react-bootstrap";
import { createExams, createExamSession } from "../utils/CreateExams";

const CreateExam = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [exams, setExams] = useState({});

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

  const [formData, setFormData] = useState({
    year: '',
    term: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Burada veriyi bir API'ye gönderebilir veya başka işlemler yapabilirsiniz
  };

  // Sınav takvimi oluşturma işlemi
  const createExamsSchedule = async () => {
    const dataToSend = {
      ...formData, // form verilerini ekliyoruz
      year: Number(formData.year),
      dates: selectedDates, // seçilen tarihleri ekliyoruz
    };
    console.log(dataToSend)
    const y = { ...formData, year: Number(formData.year), }
    await createExamSession(y)
    const x = await createExams(dataToSend); // createExams fonksiyonuna göndermek
    setShowCalendar(false)
    setExams(x); // gelen sonucu set ediyoruz
    console.log(x);
  };

  return (
    <Container><Row className="justify-content-start d-flex">
      <Col md="auto">  <h3>Sınav Takvimi Oluştur</h3>
      </Col>
<Col md="auto"><Button variant={showCalendar ? "primary" : "outline-primary"} onClick={() => setShowCalendar(!showCalendar)}>Sınav dönemi seç</Button>
</Col>
  
    </Row>
    

      {showCalendar && (
        <>
         
          <Row>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col> <Form.Group controlId="year">
                  <Form.Label>Yıl</Form.Label>
                  <Form.Control
                    as="select"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}>
                    <option value="">Seçiniz...</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                  </Form.Control>
                </Form.Group></Col>

                <Col> <Form.Group controlId="term">
                  <Form.Label>Yıl Dönemi</Form.Label>
                  <Form.Control
                    as="select"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}>
                    <option value="">Seçiniz...</option>
                    <option value="güz">Güz</option>
                    <option value="bahar">Bahar</option>
                  </Form.Control>
                </Form.Group></Col>

                <Col> <Form.Group controlId="type">
                  <Form.Label>Sınav Tipi</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}>
                    <option value="">Seçiniz...</option>
                    <option value="vize">Vize</option>
                    <option value="final">Final</option>
                  </Form.Control>
                </Form.Group></Col>
<Col>
<Button variant="outline-success" onClick={createExamsSchedule}>Oluştur</Button>
</Col>
              </Row>

            </Form>
          </Row>
<div className="mt-2">
 <CreateExamCalendar
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />

</div>
         
        </>
      )}

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
                                    <Col md={2}>{plan.lectureCode}</Col>
                                    <Col md={4}>{plan.lectureName}</Col>
                                    <Col md={2}>{plan.date}</Col>
                                    <Col md={2}>{plan.startTime}-{plan.endTime}</Col>
                                    <Col md={2}>{plan.roomNames}</Col>
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
