import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import LessonManager from "../components/LessonManager"
import ClassroomManager from "../components/ClassroomManager"
import { Helmet } from 'react-helmet';

const ClassroomManagerPage = () => {
    return <Container>
        <Helmet>
            <title>Sınıf Yönetimi</title>
        </Helmet>

        <Navbarx />
        <div
            className="bg-light rounded-4 py-2 shadow"
            style={{ marginTop: "120px" }}
        ><ClassroomManager /></div>
    </Container>
}

export default ClassroomManagerPage