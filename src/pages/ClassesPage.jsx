import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import Classes from "../components/Classes"
import { Helmet } from 'react-helmet';

const ClassesPage = () => {
    return <Container>
        <Helmet>
            <title>Sınıflar</title>
        </Helmet>
        <Navbarx />
        <div
            className="shadow rounded-4 bg-light scrollable "
            style={{ marginTop: "120px" }}
        ><Classes col={3} /></div>
    </Container>
}

export default ClassesPage