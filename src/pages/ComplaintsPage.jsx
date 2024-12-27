import { Col, Container, Row } from "react-bootstrap"
import Complaints from "../components/Complaints"
import ComplaintsOld from "../components/ComplaintsOld"
import Navbarx from "../components/Navbar"
import ComplaintsNew from "../components/ComplaintsNew"
import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react"
import { getAllComplaints } from "../utils/ComplaintApiService"

const ComplaintsPage = () => {

        const [solvedComplaints, setSolvedComplaints] = useState([])
        const [unResolvedComplaints, setUnResolvedComplaints] = useState([])

      useEffect(() => {
            const fetchComplaints = async () => {
              const complaint = await getAllComplaints();
            setSolvedComplaints(complaint.filter((event) => event.status === "Approved")) 
            setUnResolvedComplaints(complaint.filter((event) => event.status === "Pending"))   
            };
        
            fetchComplaints();
          }, []);

    return <Container fluid>
                <Helmet>
            <title>Şikayetler</title>
        </Helmet>
        <Navbarx/>
       <Row style={{ marginTop: "120px" }} className="justify-content-evenly px-4">
            <Col md={6} className="scrollable bg-light rounded-4 shadow">
            <ComplaintsNew complaints={unResolvedComplaints}/></Col>
            <Col  md={6} className="scrollable bg-light rounded-4  shadow"
            ><ComplaintsOld complaints={solvedComplaints}/></Col>

        </Row>     
    </Container>
}

export default ComplaintsPage