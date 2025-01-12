import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import InstructorSchedule from "../components/InstructorSchedule"
import { Helmet } from 'react-helmet';

const InstructorSchedulePage = () => {
    return <Container>
        <Helmet>
            <title>Ders Programı</title>
        </Helmet>

        <Navbarx />
        <div
            className="bg-light rounded-4 shadow pt-2 mb-5 pb-3 px-5"
            style={{ marginTop: "120px" }}
        >
            <h3>Haftalık Ders Programı</h3>
            <InstructorSchedule />
        </div>
    </Container>
}

export default InstructorSchedulePage