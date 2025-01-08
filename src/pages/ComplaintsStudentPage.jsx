import { Col, Container, Row } from "react-bootstrap"
import Complaints from "../components/Complaints"
import ComplaintsOld from "../components/ComplaintsOld"
import Navbarx from "../components/Navbar"
import ComplaintsNew from "../components/ComplaintsNew"
import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react"
import { getAllComplaints, getComplaintsByUserId } from "../utils/ComplaintApiService"
import ComplaintsStudentSolved from "../components/ComplaintsStudentSolved"
import ComplaintsUnresolvedStudent from "../components/ComplaintsUnresolvedStudent"
let userId= 1
const ComplaintsStudentPage = () => {

        const [solvedComplaints, setSolvedComplaints] = useState([])
        const [unResolvedComplaints, setUnResolvedComplaints] = useState([])

      useEffect(() => {
            const fetchComplaints = async () => {
            const complaint = await getComplaintsByUserId(userId);
            console.log(complaint)
            setSolvedComplaints(complaint.filter((event) => event.status === "approved")) 
            setUnResolvedComplaints(complaint.filter((event) => event.status === "pending"))   
            };
        
            fetchComplaints();
          }, []);
console.log(solvedComplaints)
    return <Container fluid>
                <Helmet>
            <title>Şikayetler</title>
        </Helmet>
        <Navbarx/>
       <Row style={{ marginTop: "120px" }} className="justify-content-evenly px-4">
            <Col md={6} className="scrollable bg-light rounded-4 shadow">
            <ComplaintsUnresolvedStudent complaints={unResolvedComplaints}/></Col>
            <Col  md={6} className="scrollable bg-light rounded-4  shadow"
            ><ComplaintsStudentSolved complaints={solvedComplaints}/></Col>

        </Row>     
    </Container>
}

export default ComplaintsStudentPage