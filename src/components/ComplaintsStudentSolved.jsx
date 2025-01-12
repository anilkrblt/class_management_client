import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Modal,
  Pagination,
  Row,
} from "react-bootstrap";
import "moment/locale/tr";
import moment from "moment";
moment.locale("tr");

const ComplaintsStudentSolved = ({ complaints }) => {
  const [selectedYears, setSelectedYears] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Yıl seçme ya da kaldırma fonksiyonu
  const toggleYearSelection = (year) => {
    if (year === "all") {
      // Tümü seçildiğinde diğer tüm yılların işaretini kaldırıyoruz
      setSelectedYears([]);
      setShowAll(true);
    } else {
      setSelectedYears(
        (prevSelected) =>
          prevSelected.includes(year)
            ? prevSelected.filter((y) => y !== year) // Seçiliyse kaldır
            : [...prevSelected, year] // Seçili değilse ekle
      );
      setShowAll(false);
    }
  };

  const handleShow = (complaint) => {
    setSelectedComplaint(complaint);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedComplaint(null);
  };

  // Pagination item'larını oluştur
  let items = [];
  for (let number = 2020; number <= 2025; number++) {
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

  function formatToInitials(str) {
    const map = {
      ç: "c",
      ğ: "g",
      ı: "i",
      İ: "I",
      ö: "o",
      ş: "s",
      ü: "u",
      Ç: "c",
      Ö: "o",
      Ş: "s",
      Ğ: "g",
      Ü: "u",
    };

    const words = str.split(" ");

    const initials = words
      .map((word) => {
        const firstChar = word.charAt(0).toLowerCase();
        return map[firstChar] || firstChar;
      })
      .join("");

    return initials;
  }

  return (
    <Container className="bg-light rounded-4  ps-2">
      <div className=" text-center sticky-top bg-light" style={{ zIndex: 10 }}>
        <h2 className="my-3 text-center">Çözülen Şikayetleriniz</h2>
        {/* Yıl seçimi için Pagination */}
        <div className="d-flex justify-content-left align-items-center">
          <Pagination className="mb-3 custom-pagination">
            <Pagination.Item
              onClick={() => {
                setShowAll(true);
                setSelectedYears([]);
              }}
              active={showAll}
            >
              Tümü
            </Pagination.Item>
            {items}
          </Pagination>
        </div>
      </div>

      <ListGroup className="ms-1">
        {complaints
          .filter(
            (item) =>
              selectedYears.length === 0 ||
              selectedYears.includes(moment(item.createdAt).year())
          ) // Yıl filtresi
          .map((item, index) => (
            <Card
              key={index}
              className="py-2 ps-2 my-1"
              style={{
                backgroundColor: index % 2 === 0 ? "#edfaf9" : "white",
              }}
            >
              <Row className=" d-flex align-items-center justify-content-around w-100' ">
                <Col md={5} className="ms-2">
                  <div>
                    <Card.Title className="text-start">{item.type}</Card.Title>
                    <Card.Text className="text-start">{item.title}</Card.Text>
                  </div>
                </Col>
                <Col md={2}>
                  <h3>{item.roomName}</h3>
                </Col>
                <Col md={2}>
                  <Col className="fs-4 fw-bold ms-2">
                    {moment(item.createdAt).date()}
                  </Col>
                  <Col className="fs-5 text-secondary">
                    {" "}
                    {moment(item.createdAt).format("MMMM")}
                  </Col>
                </Col>
                <Col md={2}>
                  <Button variant="danger" onClick={() => handleShow(item)}>
                    İncele
                  </Button>
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
          <Alert variant="success">
            Şikayet çözüldü.
            {selectedComplaint?.solveDescription && (
              <>
                <br /> Yetkilinin açıklaması:{" "}
                <strong>{selectedComplaint?.solveDescription}</strong>
              </>
            )}
          </Alert>
          {selectedComplaint && (
            <>
              <p>
                <strong>Adı Soyadı: </strong>
                {selectedComplaint.userName}
              </p>
              <p>
                <strong>Şikayet Türü: </strong>
                {selectedComplaint.type}
              </p>
              <p>
                <strong>Şikayet Başlığı: </strong>
                {selectedComplaint.title}
              </p>
              <p>
                <strong>Şikayet Yeri: </strong>
                {selectedComplaint.roomName}
              </p>
              <p>
                <strong>Şikayet Tarihi: </strong>
                {moment(selectedComplaint.createdAt).format(
                  "DD MMMM YYYY HH:mm"
                )}
              </p>
              <p>
                <strong>Şikayet Açıklaması: </strong>
                {selectedComplaint.content}
              </p>
              <p>
                <strong>Fotoğraflar: </strong>
              </p>
              <div className="d-flex flex-wrap">
                {selectedComplaint.photos.split(",").map((photo, index) => (
                  <Image
                    key={index}
                    src={`http://localhost:5132/${photo}`} 
                    alt={`Complaint Photo ${index + 1}`}
                    rounded
                    style={{
                      maxWidth: "150px",
                      margin: "10px",
                    }}
                  />
                ))}
              </div>
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

export default ComplaintsStudentSolved;
