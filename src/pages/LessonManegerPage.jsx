import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import LessonManager from "../components/LessonManager"

const LessonManagerPage = () => {
    return <Container>
        <Navbarx/>
        <div className=" bg-light rounded-4 p-2 mb-4" style={{ marginTop: "120px" }}>
            <LessonManager/>
        </div>
    </Container>
}

export default LessonManagerPage