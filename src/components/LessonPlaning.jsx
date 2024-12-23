import React, { useState } from "react";
import { Form, ListGroup, Button, Alert, Container, Row, Col } from "react-bootstrap";

const LessonPlaning = () => {
    const [lessons, setLessons] = useState([
        "mimari",
        "fizik",
        "kriptoloji",
        "c ile programlama",
        "veri tabanı",
    ]);
    const [selectedLesson, setSelectedLesson] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);

    const [unwantedDay, setUnwantedDay] = useState("");
    const [unwantedStartTime, setUnwantedStartTime] = useState("");
    const [unwantedEndTime, setUnwantedEndTime] = useState("");
    const [unwanted, setUnwanted] = useState([]);

    const handleSaveLesson = () => {
        if (!selectedLesson || !day || !startTime) {
            setShowAlert(true);
            return;
        }

        const newEntry = {
            lesson: selectedLesson,
            day,
            startTime,
        };

        setSchedule([...schedule, newEntry]);
        setSelectedLesson("");
        setDay("");
        setStartTime("");
        setShowAlert(false);
    };

    const handleSaveUnwanted = () => {
        if (!unwantedDay || !unwantedStartTime || !unwantedEndTime) {
            setShowAlert2(true);
            return;
        }

        const newEntry = {
            day: unwantedDay,
            startTime: unwantedStartTime,
            endTime: unwantedEndTime,
        };

        setUnwanted([...unwanted, newEntry]);
        setUnwantedDay("");
        setUnwantedStartTime("");
        setUnwantedEndTime("");
        setShowAlert2(false);
    };

    return (
        <Container>

            <h3>Ders Planlama</h3>
            <p>Bu dönem vereceğiniz dersler aşağıda listelenmektedir. Ders programlarında tercih ettiğiniz ve istemediğiniz zamanları seçiniz.</p>
            <Row>

                <Col md={4}>
                    <h4>Bu dönem verdiğiniz dersler</h4>
                    <ListGroup>
                        {lessons.map((lesson, index) => (
                            <ListGroup.Item key={index}>
                                {lesson}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <h4>Tercih edilen ders ve zaman ekle</h4>
                    <Form>
                        {showAlert && (
                            <Alert variant="danger">
                                Lütfen tüm alanları doldurduğunuzdan emin olun!
                            </Alert>
                        )}
                        <Form.Group>
                            <Form.Label>Günü</Form.Label>
                            <Form.Select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            >
                                <option value="">Gün seçin</option>
                                <option value="Pazartesi">Pazartesi</option>
                                <option value="Salı">Salı</option>
                                <option value="Çarşamba">Çarşamba</option>
                                <option value="Perşembe">Perşembe</option>
                                <option value="Cuma">Cuma</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Başlangıç saati</Form.Label>
                            <Form.Control
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />

                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Ders</Form.Label>
                            <Form.Select
                                value={selectedLesson}
                                onChange={(e) => setSelectedLesson(e.target.value)}
                            >
                                <option value="">Ders seçin</option>
                                {lessons.map((lesson, index) => (
                                    <option key={index} value={lesson}>
                                        {lesson}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" className="mt-3" onClick={handleSaveLesson}>
                            Ekle
                        </Button>
                    </Form>

                    {/* Kaydedilen Dersler */}
                    <h4 className="mt-3">Kaydedilen dersler</h4>
                    {schedule.length === 0 ? <p>Henüz zaman ve ders eklemediniz</p>
                        : <ListGroup>
                            {schedule.map((entry, index) => (
                                <ListGroup.Item key={index}>
                                    {entry.day} - {entry.lesson} ({entry.startTime})
                                </ListGroup.Item>
                            ))}
                        </ListGroup>}

                </Col>
                {/* İstenmeyen Zamanlar Formu */}
                <Col md={4}>
                    <h4>İstenmeyen zaman ekle</h4>
                    {showAlert2 && (
                        <Alert variant="danger">
                            Lütfen tüm alanları doldurduğunuzdan emin olun!
                        </Alert>
                    )}
                    <Form>
                        <Form.Group>
                            <Form.Label>Günü</Form.Label>
                            <Form.Select
                                value={unwantedDay}
                                onChange={(e) => setUnwantedDay(e.target.value)}
                            >
                                <option value="">Gün seçin</option>
                                <option value="Pazartesi">Pazartesi</option>
                                <option value="Salı">Salı</option>
                                <option value="Çarşamba">Çarşamba</option>
                                <option value="Perşembe">Perşembe</option>
                                <option value="Cuma">Cuma</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Başlangıç saati</Form.Label>
                            <Form.Control
                                type="time"
                                value={unwantedStartTime}
                                onChange={(e) => setUnwantedStartTime(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Bitiş saati</Form.Label>
                            <Form.Control
                                type="time"
                                value={unwantedEndTime}
                                onChange={(e) => setUnwantedEndTime(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="danger" className="mt-3" onClick={handleSaveUnwanted}>
                            Ekle
                        </Button>
                    </Form>

                    {/* Kaydedilen İstenmeyen Zamanlar */}
                    <h4 className="mt-3">Kaydedilen istenmeyen zamanlar</h4>
                    {unwanted.length === 0 ? <p>Henüz zaman eklemediniz</p>
                        : <ListGroup>
                            {unwanted.map((entry, index) => (
                                <ListGroup.Item key={index}>
                                    {entry.day} - {entry.startTime} - {entry.endTime}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>}
                </Col>
            </Row>
        </Container>
    );
}

export default LessonPlaning