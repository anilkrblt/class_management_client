import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Alert, Image, Col, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { getAllRooms } from '../utils/RoomApiService';
import { createComplaint } from '../utils/ComplaintApiService';
import { useNavigate } from 'react-router-dom';

let complaints = [
  "Sınıf arıza bildirimi",
  "Temizlik şikayeti",
  "Çöp kutularının eksikliği",
  "Laboratuvar eksiklikleri",
  "Yemekhane yemek şikayeti",
  "Isıtma problemi",
  "İnternet erişim problemi",
  "Okulun genel tadilat ihtiyacı",
  "OBS ile ilgili şikayetler",
  "Ders seçimiyle ilgili şikayetler",
  "Ders programı sorunu",
  "Sınav programı sorunu",
  "Ders notlarının zamanında paylaşılmaması",
  "Teknolojik araç eksikliği",
  "Sınav tarihlerinin geç duyurulması",
  "Proje tarihlerinin geç duyurulması",
  "Etkinlik eksikliği",
  "Öğrenci kulüplerinin aktif olmaması",
  "Kütüphane çalışma saatlerinin kısıtlı olması",
  "Ders işlenişiyle ilgili şikayet",
  "Ders materyallerinin güncel olmaması",
  "Okulda mobbing veya ayrımcılık",
  "Okul saatlerinin düzensizliği",
  "Okul yönetimiyle iletişim sorunu",
  "Okulda aşırı sıcaklık veya soğukluk",
  "Kantin ile ilgili sorunlar",
  "Bahçe düzenleme eksikliği",
  "Okulda su kesintisi yaşanması",
  "Tuvalet kağıdı ve sabun eksikliği",
  "Okul giriş-çıkış güvenlik önlemlerinin eksikliği",
  "Okul gezilerinin düzenlenmemesi"
];

const ComplaintForm = () => {
  const [images, setImages] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [complaintForm, setComplaintForm] = useState({
    type: "",
    title: "",
    roomId: "",
    content: "",
    images: []
  });
  const [rooms, setRooms] = useState([]);

  console.log(complaintForm)

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (err) {
        console.error("Sınıflar yüklenirken hata oluştu:", err);
      }
    };

    fetchClassrooms();
  }, []);




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, title, roomId, content } = complaintForm;
    if (type && title && roomId && content) {
      const data = { ...complaintForm, userName:"Ali Veli", userId: 1 }

      try {
          await createComplaint(data)
      } catch (error) {
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.")
      }
      setShowModal(true);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="container my-5">
      <Row className='align-items-center'>
        <Col md="auto"><h2>Şikayet Oluştur</h2></Col>
        <Col md="auto">
        <Button variant='outline-success' onClick={() => { navigate("/şikayetleriniz") }}>Şikayetlerim</Button>
        </Col>
      </Row>
       
      {showAlert && (
        <Alert variant="danger">
          Lütfen tüm alanları doldurduğunuzdan emin olun!
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="complaintType">
          <Form.Label>Şikayet Türü</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={complaintForm.type}
            onChange={handleInputChange}
          >
            <option>Seçiniz</option>
            {complaints.map((complaint, index) => (
              <option key={index} value={complaint}>{complaint}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="complaintPlace">
          <Form.Label>Şikayet Yeri</Form.Label>
          <Form.Control
            as="select"
            name="roomId"
            value={complaintForm.roomId}
            onChange={handleInputChange}
          >
            <option>Seçiniz</option>
            <option value="Kutuphane">Kütüphane</option>
            <option value="Yemekhane">Yemekhane</option>
            {rooms.map((room) => (
              <option key={room.roomId} value={room.roomId}>{room.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="complaintTitle">
          <Form.Label>Şikayet Başlığı</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Şikayet başlığını girin"
            value={complaintForm.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="complaintDescription">
          <Form.Label>Şikayet Açıklaması</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="content"
            placeholder="Şikayetinizi açıklayın"
            value={complaintForm.content}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="complaintImage">
          <Form.Label>Fotoğraflar (isteğe bağlı)</Form.Label>
          <div className="mb-3">
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </div>
          {images.length > 0 && (
            <div className="d-flex flex-wrap align-items-center">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="image-container"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <Image
                    src={img}
                    rounded
                    style={{
                      maxWidth: '100px',
                    }}
                  />
                  {hoverIndex === index && (
                    <div
                      className="image-overlay"
                      onClick={() => handleImageRemove(index)}
                    >
                      <Icon.Trash3
                        style={{
                          fontSize: '24px',
                          color: 'white',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
              <Button
                className='image-add'
                variant="outline-warning"
                onClick={() => document.getElementById('complaintImage').click()}
              >
                +
              </Button>
            </div>
          )}
        </Form.Group>

        <Button variant="success" type="submit" className="my-3">
          Şikayeti Gönder
        </Button>
      </Form>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Şikayetiniz Gönderildi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Şikayetiniz başarıyla gönderildi. En kısa sürede geri dönüş yapılacaktır.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComplaintForm;
