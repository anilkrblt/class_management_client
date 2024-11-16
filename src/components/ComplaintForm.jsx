import React, { useState } from 'react';
import { Form, Button, Modal, Alert, Image } from 'react-bootstrap';

const ComplaintForm = () => {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [image, setImage] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaintTitle && complaintDescription && complaintType && phoneNumber) {
      setShowModal(true);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Şikayet Oluştur</h2>
      {showAlert && (
        <Alert variant="danger">
          Lütfen tüm alanları doldurduğunuzdan emin olun!
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="complaintTitle">
          <Form.Label>Şikayet Başlığı</Form.Label>
          <Form.Control
            type="text"
            placeholder="Şikayet başlığını girin"
            value={complaintTitle}
            onChange={(e) => setComplaintTitle(e.target.value)}
          />
        </Form.Group>

        
        <Form.Group controlId="complaintPlace">
          <Form.Label>Şikayet Yeri</Form.Label>
          <Form.Control
            as="select"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option value="Hizmet">L208</option>
            <option value="Ürün">D201</option>
            <option value="Kutuphane">Kütüphane</option>
            <option value="Yemekhane">Yemekhane</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="complaintDescription">
          <Form.Label>Şikayet Açıklaması</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Şikayetinizi açıklayın"
            value={complaintDescription}
            onChange={(e) => setComplaintDescription(e.target.value)}
          />
        </Form.Group>


        <Form.Group controlId="phoneNumber">
          <Form.Label>Telefon Numarası</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Telefon numaranızı girin"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="complaintImage">
          <Form.Label>Fotoğraf (isteğe bağlı)</Form.Label>
          <Form.Control
            type="file"
            id="complaintImage"
            onChange={handleImageChange}
          />
          {image && (
            <div className="mt-3">
              <h5>Yüklenen Fotoğraf:</h5>
              <Image src={image} rounded style={{ maxWidth: '200px' }} />
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className='my-3'>
          Şikayet Gönder
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
