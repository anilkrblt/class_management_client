import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { ListGroup, Card, Container, Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Col, Row } from "react-bootstrap";
import "moment/locale/tr";
import moment from "moment";
import { deleteComplaint, updateComplaint } from "../utils/ComplaintApiService";
moment.locale("tr");

const ComplaintsUnresolvedStudent = ({ complaints }) => {
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Yeni Onay Modalı
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [unresolvedComplaints, setUnresolvedComplaints] = useState([]);

  useEffect(() => {
    setUnresolvedComplaints(complaints);
  }, [complaints]);

  const handleShow = (complaint) => {
    setSelectedComplaint(complaint);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedComplaint(null);
  };

  const handleDeleteComplaint = () => {
    setShowDeleteModal(true); // Silme onay modalını aç
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false); // Onay modalını kapat
  };

  const handleConfirmDelete = async () => {
    const id = selectedComplaint.requestId;
    try {
      await deleteComplaint(id);
      setUnresolvedComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint.requestId !== id)
      );
      setShow(false);
      setSelectedComplaint(null);
      setShowDeleteModal(false); // Modalı kapat
    } catch (error) {
      alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    }
  };

  return (
    <Container className="bg-light rounded-4 ps-2 ">
      <h2
        className="my-3 text-center sticky-top bg-light py-1"
        style={{ zIndex: 10 }}
      >
        Çözüm Bekleyen Şikayetleriniz
      </h2>

      {unresolvedComplaints.length === 0 ? (
        <p className="text-center  fw-semibold">
          Şu anda çözüm bekleyen şikayet bulunmamaktadır.
        </p>
      ) : (
        <ListGroup className="ms-1 ">
          {unresolvedComplaints.map((item, index) => (
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
      )}
      {/* Şikayet Detay Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Şikayet Detayları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button variant="danger" onClick={handleDeleteComplaint}>
            Şikayeti sil
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Şikayet Silme Onay Modalı */}
      <Modal show={showDeleteModal} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Şikayet Silme Onayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bu şikayeti silmek istediğinizden emin misiniz?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Hayır
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Evet, Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ComplaintsUnresolvedStudent;
