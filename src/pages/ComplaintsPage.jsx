import { Col, Container, Row } from "react-bootstrap"
import Complaints from "../components/Complaints"
import ComplaintsOld from "../components/ComplaintsOld"
import Navbarx from "../components/Navbar"
import ComplaintsNew from "../components/ComplaintsNew"
import { Helmet } from 'react-helmet';

const ComplaintsPage = () => {
    return <Container fluid>
                <Helmet>
            <title>Şikayetler</title>
        </Helmet>
        <Navbarx/>
       <Row style={{ marginTop: "120px" }}>
            <Col className="scrollable bg-light rounded-4 mb-3 ms-5 me-2 shadow"><ComplaintsNew/></Col>
            <Col className="scrollable bg-light rounded-4 mb-3 me-5 ms-2 shadow"><ComplaintsOld/></Col>

        </Row>     
    </Container>
}

export default ComplaintsPage