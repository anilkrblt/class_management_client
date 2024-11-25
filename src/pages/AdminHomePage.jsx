import { useContext , useEffect} from "react";
import { UserContext } from "../components/UserContext";
import { Col, Container, Row } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import Schedule from "../components/Schedule"
import Classes from "../components/Classes"
import Complaints from "../components/Complaints";

const AdminHomePage = () => {
    return <Container >
    <Navbarx />
    <Row style={{ marginTop: "100px" }} className="homepage " >
        <Col className=" scrollable bg-light rounded-4 mt-4 " md={7}  ><Classes /></Col>
        <Col className="scrollable" md={5}><Complaints/></Col>
    </Row>   
</Container>
}

export default AdminHomePage