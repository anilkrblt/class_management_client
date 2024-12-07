import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import LessonManager from "../components/LessonManager"
import ClassroomManager from "../components/ClassroomManager"

const ClassroomManagerPage = () => {
    return <Container>
        <Navbarx />
        <div
            className="bg-light rounded-4 py-2"
            style={{ marginTop: "120px" }}
        ><ClassroomManager /></div>
    </Container>
}

export default ClassroomManagerPage