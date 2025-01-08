import { useState } from "react";
import { Accordion, Col, Container, Row, Form } from "react-bootstrap";

const initialLessons = [
    { id: 1, lessonName: "Kriptoloji", code: "BIL101", room: "D201", vizeExamTime: 60, finalExamTime: 90, startTime: "13:00", endTime: "15:00", day: "Pazartesi" },
    { id: 2, lessonName: "Şifreleme Teknikleri", code: "BIL102", room: "D202", vizeExamTime: 50, finalExamTime: 80, startTime: "10:00", endTime: "12:00", day: "Salı" },
    { id: 3, lessonName: "Ağ Güvenliği", code: "BIL103", room: "D203", vizeExamTime: 55, finalExamTime: 85, startTime: "09:00", endTime: "11:00", day: "Çarşamba" },
    { id: 4, lessonName: "Bilgi Güvenliği", code: "BIL104", room: "D204", vizeExamTime: 70, finalExamTime: 100, startTime: "14:00", endTime: "16:00", day: "Perşembe" },
  ];

const InstructorLessons = () => {
    const [lessons, setLessons] = useState(initialLessons);

    const handleInputChange = (id, field, value) => {
        setLessons((prevLessons) =>
            prevLessons.map((lesson) =>
                lesson.id === id ? { ...lesson, [field]: Number(value) } : lesson
            )
        );
    };

    return (
        <Container>
            <h2>Bu dönem verdiğiniz dersler</h2>
            <Row>
                <Col>
                    <Accordion className="custom-accordion">
                        {lessons.map((lesson) => (
                            <Accordion.Item key={lesson.id} eventKey={lesson.id.toString()} className="mt-2">
                                <Accordion.Header>{lesson.code} {lesson.lessonName}</Accordion.Header>
                                <Accordion.Body>
                                    <p><strong>Sınıf: </strong>{lesson.room}</p>
                                    <p><strong>Gün ve saat: </strong>{lesson.day} {lesson.startTime}-{lesson.endTime}</p>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Vize Süresi (dakika)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={lesson.vizeExamTime}
                                                    onChange={(e) =>
                                                        handleInputChange(lesson.id, "vizeExamTime", e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Final Süresi (dakika)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={lesson.finalExamTime}
                                                    onChange={(e) =>
                                                        handleInputChange(lesson.id, "finalExamTime", e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
};

export default InstructorLessons;
