import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Modal, OverlayTrigger, ProgressBar, Row, Tooltip } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import getAllRooms from "../utils/ApiService";


const ClassesList = ({ setSelectedCard }) => {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await getAllRooms();
            setRooms(events) // Veriyi burada işleyebilirsiniz.
        };

        fetchEvents();
    }, []);


    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        capacity: '',
        projection: '',
        classType: ''
    });

    const typeCode2Name = (typeName) =>{
      
        switch (typeName) {
            case 0:
              return "Derslik"
            case 5:
              return "Amfi"
            case 2:
              return "Bilgisayar Lab."
            case 1:
              return "Elektrik Lab."
            case 3:
              return "Genetik Lab."
            case 4:
              return "Gıda Lab."
            case 6:
              return "Makine Lab."
          }

}

    const filteredCards = rooms.filter(card =>
        card.name.toLowerCase().includes(searchTerm) &&
        (filterOptions.capacity ? card.capacity >= filterOptions.capacity : true) &&
        (filterOptions.projection ? card.projection === (filterOptions.projection === "true") : true) &&
        (filterOptions.classType ? card.classType === filterOptions.classType : true)
    );
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const [showModal, setShowModal] = useState(false);
    const handleShowFilterModal = () => setShowFilterModal(true);
    const handleCloseFilterModal = () => setShowFilterModal(false);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const [selectedCardId, setSelectedCardId] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setSelectedCardId(card.roomId);

    };


    return <Container>
        <Row className="bg-light mb-3 py-2 " style={{ position: "sticky", top: 0, zIndex: 100 }}>

            <Col>
                <Row>
                    <Col md={10}>
                        <Form.Control
                            type="text"
                            placeholder="Sınıf ara"
                            style={{ borderRadius: '15px' }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Col>
                    <Col className="my-1" md={2}>
                        <Icon.Funnel size={28} onClick={handleShowFilterModal} className='cursor-pointer' />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row >
            {
                filteredCards.length === 0 ? (
                    <Col className='text-center'>
                        <p>Seçimlerinize uygun sınıf bulunamadı.</p>
                    </Col>
                ) :
                    filteredCards.map((card, index) => (
                        <Row key={index} className="mb-2 ">
                            <Card
                                style={{ height: "8vh" }}
                                onClick={() => handleCardClick(card)}
                                className={card.roomId === selectedCardId ? "border border-primary bg-light" : ""}
                            >
                                <Card.Body>
                                    <Row className='row-cols-auto justify-content-around'>
                                        <Col md={3}> <Card.Title className="fw-bold ">{card.name}</Card.Title></Col>
                                        <Col md={3}>Kapasite: <b>{card.capacity}</b></Col>
                                        <Col md={3}>{typeCode2Name(card.roomType)}</Col>
                                        {card.isProjectorWorking && <Col md={1} className="d-flex justify-content-end">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-top">Projeksiyon Cihazı</Tooltip>}
                                            >
                                                <div className='cursor-pointer'>
                                                    <Icon.Projector size={30} />
                                                </div>
                                            </OverlayTrigger>
                                        </Col>}


                                        <Col md={2}>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-top">Bilgisayar Laboratuvarı</Tooltip>}
                                            >
                                                <div className='cursor-pointer'>
                                                    <Icon.PcDisplay size={20} />
                                                </div>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Row>
                    )
                    )}
        </Row>

        <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
            <Modal.Header closeButton>
                <Modal.Title>Filtrele</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCapacity">
                        <Form.Label>Kapasite</Form.Label>
                        <ProgressBar
                            now={filterOptions.capacity}
                            max={200}  // max kapasite değeri
                            label={`${filterOptions.capacity}`}  // Kapasiteyi tam sayı olarak göster
                        />
                        <Form.Control
                            type="range"
                            min={0}
                            max={200}
                            step={1}
                            name="capacity"
                            value={filterOptions.capacity}
                            onChange={handleFilterChange}
                        />
                        <Form.Text className="text-muted">
                            Kapasite: Minimum {filterOptions.capacity} kişilik
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formClassType">
                        <Form.Label>Sınıf Türü</Form.Label>
                        <Form.Control
                            as="select"
                            name="classType"
                            value={filterOptions.classType}
                            onChange={handleFilterChange}
                        >
                            <option value="">Tümü</option>
                            <option value="Derslik">Derslik</option>
                            <option value="Amfi">Amfi</option>
                            <option value="Laboratuvar">Laboratuvar</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formProjection">
                        <Form.Label>Projeksiyon</Form.Label>
                        <Form.Control
                            as="select"
                            name="projection"
                            value={filterOptions.projection}
                            onChange={handleFilterChange}
                        >
                            <option value="">Tümü</option>
                            <option value="true">Var</option>
                            <option value="false">Yok</option>
                        </Form.Control>
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFilterModal}>Kapat</Button>
                <Button variant="primary" onClick={handleCloseFilterModal}>Uygula</Button>
            </Modal.Footer>
        </Modal>
    </Container>
}


export default ClassesList