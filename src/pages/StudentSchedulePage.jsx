import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import StudentSchedule from "../components/StudentSchedule"
import { Helmet } from 'react-helmet';

const StudentSchedulePage = () => {
    return <Container>
        
        <Helmet>
            <title>Ders Programı</title>
        </Helmet>

        <Navbarx />
        <div
            className="bg-light rounded-4 pt-2  pb-3 px-5 shadow mb-5"
            style={{ marginTop: "120px" }}
        >
            <h3>Haftalık Ders Programı</h3>
            <StudentSchedule />
        </div>
    </Container>
}

export default StudentSchedulePage