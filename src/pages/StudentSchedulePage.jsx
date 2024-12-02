import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import StudentSchedule from "../components/StudentSchedule"

const StudentSchedulePage = () => {
    return <Container>
        <Navbarx />
        <div
            className="bg-light rounded-4 pt-2  pb-3 px-5"
            style={{ marginTop: "120px" }}
        >
            <h3>Haftalık ders programı</h3>
            <StudentSchedule />
        </div>
    </Container>
}

export default StudentSchedulePage