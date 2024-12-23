import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import LessonManager from "../components/LessonManager"
import { Helmet } from 'react-helmet';

const LessonManagerPage = () => {
    return <Container>
        <Helmet>
            <title>Dersler</title>
        </Helmet>

        <Navbarx />
        <div className=" bg-light rounded-4 p-2 mb-4 shadow" style={{ marginTop: "120px" }}>
            <LessonManager />
        </div>
    </Container>
}

export default LessonManagerPage