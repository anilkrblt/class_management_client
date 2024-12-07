import { useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { Col, Container, Row } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import Schedule from "../components/Schedule"
import Classes from "../components/Classes"
import Complaints from "../components/Complaints";
import { locale } from "moment";

const AdminHomePage = () => {
    const {userType, setUserType } = useContext(UserContext);
    
    useEffect(() => {
        setUserType("admin");
      }, [setUserType]);

    return <Container >
        <Navbarx />
        <Row style={{ marginTop: "100px" }} className="homepage justify-content-around" >
            <Col className=" scrollable bg-light rounded-4 mt-4 " md={7}  ><Classes col={6} /></Col>
            
            <Col md={4} className=" scrollable bg-light rounded-4 mt-4 ">
                <Complaints/>
                
            </Col>
        </Row>
    </Container>
}

export default AdminHomePage