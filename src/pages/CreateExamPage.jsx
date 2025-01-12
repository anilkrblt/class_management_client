import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import CreateExam from "../components/CreateExam"

const CreateExamPage = () => {
    return <Container>
        <Navbarx/>
        
        <div className="bg-light rounded-4 shadow ps-2 py-2" style={{marginTop: 120}}>
        <CreateExam/>
        </div>
        
    </Container>
}

export default CreateExamPage