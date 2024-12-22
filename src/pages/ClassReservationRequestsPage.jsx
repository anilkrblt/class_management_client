import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import ClassReservationRequests from "../components/ClassReservationRequests"

const ClassReservationRequestsPage = () => {
    return <Container>
        <Navbarx/>
        <div style={{ marginTop: "120px" }} 
        className="scrollable bg-light rounded-4" >
            <ClassReservationRequests/>
        </div>
    </Container>
}

export default ClassReservationRequestsPage