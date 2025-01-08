import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import CreateExam from "../components/CreateExam"

const CreateExamPage = () => {
    return <Container>
        <Navbarx/>
        <div style={{marginTop: 150}}>
        <CreateExam/>
        </div>
        
    </Container>
}

export default CreateExamPage