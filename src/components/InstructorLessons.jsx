import { Accordion, Col, Container, Row } from "react-bootstrap"

const lessons = [
    {id:1, lessonName: "Kriptoloji", room: "D201", vizeExamTime: 60, finalExamTime: 90},
    {id:2, lessonName: "Kriptoloji", room: "D201", vizeExamTime: 60, finalExamTime: 90 },
    {id:3,lessonName: "Kriptoloji", room: "D201", vizeExamTime: 60, finalExamTime: 90 },
    {id:4,lessonName: "Kriptoloji", room: "D201", vizeExamTime: 60, finalExamTime: 90 },


]
const InstructorLessons = () => {
    return <Container>
        <h2>Bu dönem verdiğiniz dersler</h2>
        <Row>
    <Col>
        <Accordion>
        {lessons.map((lesson) => (
            <Accordion.Item key={lesson.id} eventKey="1"> 
                <Accordion.Header>{lesson.lessonName}</Accordion.Header>
                <Accordion.Body>
                    
                    {lesson.room} {lesson.vizeExamTime} {lesson.finalExamTime}</Accordion.Body>
            </Accordion.Item>
        ))}
        </Accordion>
    </Col>
</Row>

    </Container>
}

export default InstructorLessons