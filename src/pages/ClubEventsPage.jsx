import { Col, Container } from "react-bootstrap"
import ClubEvents from "../components/ClubEvents"
import ClubEventsOld from "../components/ClubEventsOld"
import Navbarx from "../components/Navbar"
import { Helmet } from 'react-helmet';
import { getAllClubEvents } from "../utils/ClubEventApiService";
import { useEffect, useState } from "react";

const ClubEventsPage = () => {
    const [events, setEvents] = useState([])
    const [oldEvents, setOldEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
          const events = await getAllClubEvents();
        setOldEvents(events.filter((event) => event.status === "outdated")) 
        setEvents(events.filter((event) => event.status === "approved")) 
        };
    
        fetchEvents();
      }, []);
  console.log(oldEvents)
    return <Container>

        <Helmet>
            <title>Kulüpler</title>
        </Helmet>

        <Navbarx />
        <div style={{ marginTop: "120px" }}>
            <Col className="scrollable bg-light rounded-4 mb-3 shadow" style={{ height: "30vh" }} >
            <ClubEvents events={events}/></Col>
            <Col className="scrollable bg-light rounded-4 shadow" style={{ height: "50vh" }}>
            <ClubEventsOld events={oldEvents}/></Col>
        </div>
    </Container>
}

export default ClubEventsPage