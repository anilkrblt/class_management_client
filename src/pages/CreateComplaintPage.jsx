import { Col, Container, Row } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import ComplaintForm from "../components/ComplaintForm"
import { Helmet } from 'react-helmet';

const CreateComplaintPage = () => {
    return <Container >
        
        <Helmet>
            <title>Şikayet Oluştur</title>
        </Helmet>
        <Navbarx />
        <Container className=" bg-light rounded-4" style={{ marginTop: "120px" }} >
            <ComplaintForm
            />
        </Container>


    </Container>
}

export default CreateComplaintPage