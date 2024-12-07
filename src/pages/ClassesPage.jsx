import { Container } from "react-bootstrap"
import Navbarx from "../components/Navbar"
import Classes from "../components/Classes"

const ClassesPage = () => {
    return <Container>
        <Navbarx />
        <div
            className="bg-light rounded-4 py-2"
            style={{ marginTop: "120px" }}
        ><Classes col={3} /></div>
    </Container>
}

export default ClassesPage