import { useState,useEffect } from "react";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Modal, OverlayTrigger, ProgressBar, Row, Tooltip } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';


const ClassesList = ({setSelectedCard}) => {

    const cards = [
        { id: 1, title: "D201", text: "Ders işleniyor", text2: "Mukavemet", capacity: 40, projection: true, classType: "Derslik" },
        { id: 2, title: "D305", text: "Ders işleniyor", text2: "Bilgisayar Ağları", capacity: 35, projection: false, classType: "Derslik" },
        { id: 3, title: "D204", text: "Sınıf kapalı", capacity: 0, projection: false, classType: "Laboratuvar" },
        { id: 4, title: "D104", text: "Boş", capacity: 50, projection: true, classType: "Laboratuvar" },
        { id: 5, title: "D201", text: "Ders işleniyor", text2: "Matematik 2", capacity: 40, projection: true, classType: "Derslik" },
        { id: 1, title: "D201", text: "Ders işleniyor", text2: "Mukavemet", capacity: 40, projection: true, classType: "Derslik" },
        { id: 2, title: "D305", text: "Ders işleniyor", text2: "Bilgisayar Ağları", capacity: 35, projection: false, classType: "Derslik" },
        { id: 3, title: "D204", text: "Sınıf kapalı", capacity: 0, projection: false, classType: "Laboratuvar" },
        { id: 4, title: "D104", text: "Boş", capacity: 50, projection: true, classType: "Laboratuvar" },
        { id: 5, title: "D201", text: "Ders işleniyor", text2: "Matematik 2", capacity: 40, projection: true, classType: "Derslik" },
        { id: 1, title: "D201", text: "Ders işleniyor", text2: "Mukavemet", capacity: 40, projection: true, classType: "Derslik" },
        { id: 2, title: "D305", text: "Ders işleniyor", text2: "Bilgisayar Ağları", capacity: 35, projection: false, classType: "Derslik" },
        { id: 3, title: "D204", text: "Sınıf kapalı", capacity: 0, projection: false, classType: "Laboratuvar" },
        { id: 4, title: "D104", text: "Boş", capacity: 50, projection: true, classType: "Laboratuvar" },
        { id: 5, title: "D201", text: "Ders işleniyor", text2: "Matematik 2", capacity: 40, projection: true, classType: "Derslik" },
        { id: 1, title: "D201", text: "Ders işleniyor", text2: "Mukavemet", capacity: 40, projection: true, classType: "Derslik" },
        { id: 2, title: "D305", text: "Ders işleniyor", text2: "Bilgisayar Ağları", capacity: 35, projection: false, classType: "Derslik" },
        { id: 3, title: "D204", text: "Sınıf kapalı", capacity: 0, projection: false, classType: "Laboratuvar" },
        { id: 4, title: "D104", text: "Boş", capacity: 50, projection: true, classType: "Laboratuvar" },
        { id: 5, title: "D201", text: "Ders işleniyor", text2: "Matematik 2", capacity: 40, projection: true, classType: "Derslik" },
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        capacity: '',
        projection: '',
        classType: ''
    });


    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchTerm) &&
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
        setSelectedCardId(card.id);
        
    };


    return <Container>
        <Row className="bg-light mb-3 py-2 " style={{ position: "sticky", top: 0, zIndex: 100 }}>

            <Col>
                <DropdownButton title="Tüm sınıflar">
                    <Dropdown.Item eventKey="1">Derslikler</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Laboratuvarlar</Dropdown.Item>
                </DropdownButton>
            </Col>
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
                    filteredCards.map((card,index) => (
                        <Row key={index }  className="mb-2 ">
                            <Card
                                style={{height:"8vh"}}
                                onClick={() =>  handleCardClick(card)}
                                className={card.id === selectedCardId ? "border border-primary bg-light" : ""}
                            >
                                <Card.Body>
                                    <Row className='row-cols-auto justify-content-around'>
                                        <Col md={2}> <Card.Title className="fw-bold ">{card.title}</Card.Title></Col>
                                        <Col md={3}>Kapasite: <b>150</b></Col>
                                        <Col md={3}>{card.classType}</Col>
                                        <Col md={1} className="d*flex justify-content-end">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip-top">Projeksiyon Cihazı</Tooltip>}
                                            >
                                                <div className='cursor-pointer'>
                                                    <Icon.Projector size={30} />
                                                </div>
                                            </OverlayTrigger>
                                        </Col>
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