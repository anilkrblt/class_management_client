import { Col, Container } from "react-bootstrap"
import Complaints from "../components/Complaints"
import ComplaintsOld from "../components/ComplaintsOld"
import Navbarx from "../components/Navbar"
import ComplaintsNew from "../components/ComplaintsNew"

const ComplaintsPage = () => {
    return <Container>
        <Navbarx/>
       <Col style={{ marginTop: "120px" }}>
       <div className=" scrollable bg-light rounded-4 mb-5 "><ComplaintsNew/></div>
       <div className=" scrollable bg-light rounded-4 mb-3 "><ComplaintsOld /></div>
       </Col>        
    </Container>
}

export default ComplaintsPage