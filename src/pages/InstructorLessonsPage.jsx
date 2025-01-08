import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import InstructorLessons from "../components/InstructorLessons"

const InstructorLessonsPage = () =>{
    return <Container>
        <Navbarx/>
        <div style={{marginTop: 120}} className="bg-light pb-3 rounded-4 shadow">
            <InstructorLessons/>
        </div>
    </Container>
}

export default InstructorLessonsPage