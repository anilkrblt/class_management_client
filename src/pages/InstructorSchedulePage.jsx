import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import InstructorSchedule from "../components/InstructorSchedule"

const InstructorSchedulePage = () => {
    return <Container>
        <Navbarx />
        <div
            className="bg-light rounded-4 pt-2  pb-3 px-5"
            style={{ marginTop: "120px" }}
        >
            <h3>Haftalık ders programı</h3>
            <InstructorSchedule/>
        </div>
    </Container>
}

export default InstructorSchedulePage