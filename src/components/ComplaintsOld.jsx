import { useState } from "react";
import { Alert, Button, Card, Col, Container, Image, ListGroup, Modal, Pagination, Row } from "react-bootstrap";

const ComplaintsOld = () => {
    // Şikayetler verisi

    const oldComplaints = [
        { name: "Can Öztürk", exp: "Sınıf arıza bildirimi", class: "L201", year: 2022 },
        { name: "Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201", year: 2023 },
        { name: "Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208", year: 2023 },
        { name: "Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201", year: 2024 },
        { name: "Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204", year: 2024 },
        { name: "Can Öztürk", exp: "Sınıf arıza bildirimi", class: "L201", year: 2022 },
        { name: "Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201", year: 2023 },
        { name: "Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208", year: 2023 },
        { name: "Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201", year: 2024 },
        { name: "Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204", year: 2024 },
        { name: "Can Öztürk", exp: "Sınıf arıza bildirimi", class: "L201", year: 2022 },
        { name: "Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201", year: 2023 },
        { name: "Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208", year: 2023 },
        { name: "Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201", year: 2024 },
        { name: "Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204", year: 2024 },
    ];

    // Seçilen yılları tutan state
    const [selectedYears, setSelectedYears] = useState([]);

    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Yıl seçme ya da kaldırma fonksiyonu
    const toggleYearSelection = (year) => {
        setSelectedYears((prevSelected) =>
            prevSelected.includes(year)
                ? prevSelected.filter((y) => y !== year) // Seçiliyse kaldır
                : [...prevSelected, year] // Seçili değilse ekle
        );
    };

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
        setSelectedComplaint(null);
    };

    // Tüm şikayetleri gösteren fonksiyon
    const showAll = () => setSelectedYears([]);

    // Pagination item'larını oluştur
    let items = [];
    for (let number = 2020; number <= 2024; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={selectedYears.includes(number)} // Seçili yıllar
                onClick={() => toggleYearSelection(number)} // Yıl seçimi
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container className="bg-light rounded-4  ps-2">
            <div className=" text-center sticky-top bg-light" style={{ zIndex: 10 }}>
            <h2 className="my-3 text-center">Çözülen Şikayetler</h2>
            {/* Yıl seçimi için Pagination */}
            <div className="d-flex justify-content-left align-items-center">
                <Pagination className="mb-3" >{items}</Pagination>
                <Button variant="link" onClick={showAll} className="ms-3">
                    Tümü
                </Button>
            </div>
            </div>
            
            <ListGroup className="ms-1">
                {oldComplaints
                    .filter((item) => selectedYears.length === 0 || selectedYears.includes(item.year)) // Yıl filtresi
                    .map((item, index) => (
                        <Card
                            key={index}
                            className="py-2 ps-2 my-1"
                            style={{
                                backgroundColor: index % 2 === 0 ? "#edfaf9" : "white",
                            }}
                        >

                            <Row className=" d-flex align-items-center justify-content-around w-100' ">
                                <Col md={1}>
                                    <Image
                                        src={item.logo || "https://via.placeholder.com/50"}
                                        roundedCircle
                                        width={50}
                                        className="me-3"
                                    />
                                </Col>
                                <Col md={4} className='ms-2'>
                                    <div>
                                        <Card.Title className="text-start">{item.name}</Card.Title>
                                        <Card.Text className="text-start">
                                            {item.exp}
                                        </Card.Text>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <h3>L208</h3>
                                </Col>
                                <Col md={2}>

                                    <Col className='fs-4 fw-bold ms-2'>15</Col>
                                    <Col className='fs-5 text-secondary'>Kasım</Col>

                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" onClick={() => handleShow(item)}>İncele</Button>
                                </Col>

                            </Row>

                        </Card>
                    ))}
            </ListGroup>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Şikayet Detayları</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert  variant="success">
                        Şikayet çözüldü <strong>Sınıf kapatıldı</strong>
                    </Alert>
                    {selectedComplaint && (
                        <>
                            <p><strong>Adı Soyadı:</strong> {selectedComplaint.name}</p>
                            <p><strong>Şikayet Türü:</strong> {selectedComplaint.exp}</p>
                            <p><strong>Şikayet Yeri:</strong> {selectedComplaint.class}</p>
                            <p><strong>Şikayet Tarihi:</strong></p>
                            <p><strong>Şikayet Açıklaması:</strong> Türkiye, resmî adıyla Türkiye Cumhuriyeti, topraklarının büyük bölümü Batı Asya'da Anadolu'da, diğer bir bölümü ise Güneydoğu Avrupa'nın uzantısı Doğu Trakya'da olan kıtalararası bir ülkedir. Batıda Bulgaristan ve Yunanistan, doğuda Gürcistan, Ermenistan, İran ve Azerbaycan, güneyde ise Irak ve Suriye ile sınır komşusudur. Güneyini Kıbrıs ve Akdeniz, batısını Ege Denizi, kuzeyini ise Karadeniz çevreler. Marmara Denizi ise İstanbul Boğazı ve Çanakkale Boğazı ile birlikte Anadolu'yu Trakya'dan, yani Asya'yı Avrupa'dan ayırır. Resmî olarak laik bir devlet olan Türkiye'de nüfusun çoğunluğu Müslüman'dır. Ankara, Türkiye'nin başkenti ve ikinci en kalabalık şehri; İstanbul ise, Türkiye'nin en kalabalık şehri, ekonomik ve finansal merkezi ve aynı zamanda Avrupa'nın en kalabalık şehridir.</p>
                            <p><strong>Fotoğraflar:</strong> </p> <Image src="/tu_logo.jpg" />
                             
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ComplaintsOld;
