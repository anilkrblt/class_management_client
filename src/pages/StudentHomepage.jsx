import { Col, Container, Row } from "react-bootstrap";
import Navbarx from "../components/Navbar";
import ClassCalendarStudent from "../components/ClassCalendarStudent";
import Schedule from "../components/Schedule";
import Classes from "../components/Classes";
import { useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { Helmet } from "react-helmet";
import StudentExams from "../components/StudentExams";
import { useLocation } from "react-router-dom";

const StudentHomePage = () => {
  const { userType, setUserType, userName } = useContext(UserContext);
  const location = useLocation();
  const notifications = location.state?.notifications || []; // Gönderilen veriyi alın
  console.log(notifications)
  console.log(userName)
  useEffect(() => {
    setUserType("student");
  }, [setUserType]);

  return (
    <Container>
      <Helmet>
        <title>Ana Sayfa</title>
      </Helmet>
      <Navbarx />
      <Row style={{ marginTop: "100px" }} className="homepage ">
        <Col className=" scrollable bg-light rounded-4 mt-4 shadow" md={7}>
          <Classes col={6} />
        </Col>
        <Col md={5}>
          <Schedule />
        </Col>
      </Row>
    </Container>
  );
};

export default StudentHomePage;
