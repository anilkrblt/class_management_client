import React, { useState } from 'react';
import { Form, Button, Modal, Alert, Image } from 'react-bootstrap';
import ComplaintForm from './components/ComplaintForm';


const App = () => {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [image, setImage] = useState(null); // Fotoğraf durumu
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Fotoğrafı state'e kaydediyoruz
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaintTitle && complaintDescription && complaintType) {
      // Şikayet başarılı şekilde gönderildiğinde modal'ı göster
      setShowModal(true);
      setShowAlert(false);
    } else {
      // Eksik alan varsa uyarı göster
      setShowAlert(true);
    }
  };

  return (
  <ComplaintForm/>
  );
};

export default App;
