import { useContext , useEffect} from "react";
import { UserContext } from "../components/UserContext";
import { Col, Container, Row } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import Schedule from "../components/Schedule"
import Classes from "../components/Classes"


const InstructorHomePage = () => {
    const {userType, setUserType } = useContext(UserContext);
    
    useEffect(() => {
        setUserType("instructor");
      }, [setUserType]);
      
    return <Container >
        <Navbarx />
        <Row style={{ marginTop: "100px" }} className="homepage " >
            <Col className=" scrollable bg-light rounded-4 mt-4 " md={7}  ><Classes /></Col>
            <Col md={5}><Schedule /></Col>
        </Row>

        
        
    </Container>
}

export default InstructorHomePage