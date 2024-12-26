import React, { useState } from 'react';
import { Form, Button, Modal, Alert, Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const ComplaintForm = () => {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [complaintPlace, setComplaintPlace] = useState('');
  const [images, setImages] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null); // Hover edilen görüntünün indeksini saklayın
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [complaintForm, setComplaintForm] = useState({
    title: "", 
    type: "",
    place: "",
    description: "",
    images: []
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaintTitle && complaintDescription && complaintPlace && complaintType ) {
      setComplaintForm({
        title: complaintTitle, 
        type: complaintType,
        place: complaintPlace,
        description: complaintDescription,
        images: images
      })
      
      setShowModal(true);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="container my-5">
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

        <Form.Group controlId="complaintType">
          <Form.Label>Şikayet Türü</Form.Label>
          <Form.Control
            as="select"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.type)}
          >
            <option value="">Seçiniz</option>
            <option value="Sınıf arıza bildirimi">Sınıf arıza bildirimi</option>
            <option value="Ürün">???</option>
 
          </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="complaintPlace">
          <Form.Label>Şikayet Yeri</Form.Label>
          <Form.Control
            as="select"
            value={complaintPlace}
            onChange={(e) => setComplaintPlace(e.target.value)}
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

        <Form.Group controlId="complaintImage">
          <Form.Label>Fotoğraflar (isteğe bağlı)</Form.Label>
          <div className="mb-3">
            <Form.Control
              type="file"
              multiple
            //  id="complaintImage"
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

        <Button variant="primary" type="submit" className="my-3">
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
