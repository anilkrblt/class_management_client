import { Col, Container } from "react-bootstrap"
import ClubEvents from "../components/ClubEvents"
import ClubEventsOld from "../components/ClubEventsOld"
import Navbarx from "../components/Navbar"
import { Helmet } from 'react-helmet';

const ClubEventsPage = () => {
    return <Container>

        <Helmet>
            <title>Kulüpler</title>
        </Helmet>

        <Navbarx />
        <div style={{ marginTop: "120px" }}>
            <Col className="scrollable bg-light rounded-4 mb-3" style={{ height: "30vh" }} ><ClubEvents /></Col>
            <Col className="scrollable bg-light rounded-4 " style={{ height: "50vh" }}><ClubEventsOld /></Col>
        </div>
    </Container>
}

export default ClubEventsPage