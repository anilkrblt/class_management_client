import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import LessonPlaning from "../components/LessonPlaning"

const LessonPlaningPage = () => {
    return <Container>
        <Navbarx/>
        <div className=" bg-light rounded-4 p-2 mb-4" style={{ marginTop: "120px" }}>
            <LessonPlaning/>
        </div>
    </Container>
}

export default LessonPlaningPage