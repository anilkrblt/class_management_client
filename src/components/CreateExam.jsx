import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

const CreateExam = () => {
  const [examType, setExamType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Sınav Türü: ${examType}\nBaşlangıç: ${startDate}\nBitiş: ${endDate}`);
  };

  return (
    <Container className="bg-light py-2 rounded-4 shadow">
      <h2>Sınav Takvimi Oluştur</h2>
      <Form onSubmit={handleSubmit}>
 
 <Row>

        <Col>
          <Form.Group className="mb-3" controlId="examType">
          <Form.Label>Sınav Türü</Form.Label>
          <Form.Control
            as="select"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            required
          >
            <option value="">Sınav türü seçin</option>
            <option value="Vize">Vize</option>
            <option value="Final">Final</option>
          </Form.Control>
        </Form.Group>
        </Col>
      <Col>  
      {/* Başlangıç Tarihi */}
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label>Başlangıç Tarihi</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Form.Group>
      </Col>

      <Col>
       {/* Bitiş Tarihi */}
        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>Bitiş Tarihi</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Form.Group>
      </Col>
           <Col>
           <Button variant="primary" type="submit" className="mt-4">
          Oluştur
        </Button>
        </Col>
 </Row>

        {/* Gönder Butonu */}
        
      </Form>
    </Container>
  );
};

export default CreateExam;
