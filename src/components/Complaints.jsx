import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { ListGroup, Card, Container, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const Complaints = () => {
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const complaints = [
        { name: "Can Öztürk", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201" },
        { name: "Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208" },
        { name: "Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204" },
        { name: "Can Öztürk", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201" },
        { name: "Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208" },
        { name: "Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204" },
        { name: "Can Öztürk", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201" },
        { name: "Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208" },
        { name: "Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204" },
        { name: "Can Öztürk", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Zeynep Şentürk", exp: "Sınıf arıza bildirimi", class: "D201" },
        { name: "Melih Yaşar", exp: "Sınıf arıza bildirimi", class: "L208" },
        { name: "Sıla Yıldız", exp: "Sınıf arıza bildirimi", class: "L201" },
        { name: "Ali Duru", exp: "Sınıf arıza bildirimi", class: "D204" },

    ];

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedComplaint(null);
    };

    function formatToInitials(str) {
        // Türkçe harfleri doğru şekilde dönüştürmek için harf dönüşümü
        const map = {
          'ç': 'c',
          'ğ': 'g',
          'ı': 'i',
          'İ': 'I',
          'ö': 'o',
          'ş': 's',
          'ü': 'u',
          'Ç': 'c',
          'Ö': 'o',
          'Ş': 's',
          'Ğ': 'g',
          'Ü': 'u',
        };
      
        // Kelimeleri boşluktan ayırıyoruz
        const words = str.split(' ');
      
        // İlk harfleri alıp küçük yaparak dönüştürme
        const initials = words.map(word => {
          const firstChar = word.charAt(0).toLowerCase(); // İlk harfi alıyoruz
          return map[firstChar] || firstChar; // Türkçe harfler için dönüşüm yapıyoruz
        }).join('');
      
        return initials;
      }
    

    return (
        <Container className="bg-light rounded-4 ps-2 ">
            <h2 className="my-3 text-center sticky-top bg-light py-1">Şikayetler</h2>
            <ListGroup className="ms-1">
                {complaints.map((item, index) => (
                    <Card
                        key={index}
                        className="my-1"
                        style={{ backgroundColor: index % 2 === 0 ? '#edfaf9' : 'white' }}
                    >
                        <Card.Body className="d-flex align-items-center justify-content-around">
                            <Image
                                 src={`https://cdn.auth0.com/avatars/${formatToInitials(item.name)}.png`} // İlk harflerden oluşan URL
                                 roundedCircle
                                
                                width={50}
                                className="me-3"
                            />
                            <div>
                                <Card.Title className="text-start">{item.name}</Card.Title>
                                <Card.Text className="text-start">
                                    {item.exp} - {item.class}
                                </Card.Text>
                            </div>
                            <Button variant="danger" onClick={() => handleShow(item)}>
                                İncele
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </ListGroup>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Şikayet Detayları</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <>
                            <p><strong>Adı Soyadı:</strong> {selectedComplaint.name}</p>
                            <p><strong>Şikayet Türü:</strong> {selectedComplaint.exp}</p>
                            <p><strong>Şikayet Yeri:</strong> {selectedComplaint.class}</p>
                            <p><strong>Şikayet Tarihi:</strong></p>
                            <p><strong>Şikayet Açıklaması:</strong> Türkiye, resmî adıyla Türkiye Cumhuriyeti, topraklarının büyük bölümü Batı Asya'da Anadolu'da, diğer bir bölümü ise Güneydoğu Avrupa'nın uzantısı Doğu Trakya'da olan kıtalararası bir ülkedir. Batıda Bulgaristan ve Yunanistan, doğuda Gürcistan, Ermenistan, İran ve Azerbaycan, güneyde ise Irak ve Suriye ile sınır komşusudur. Güneyini Kıbrıs ve Akdeniz, batısını Ege Denizi, kuzeyini ise Karadeniz çevreler. Marmara Denizi ise İstanbul Boğazı ve Çanakkale Boğazı ile birlikte Anadolu'yu Trakya'dan, yani Asya'yı Avrupa'dan ayırır. Resmî olarak laik bir devlet olan Türkiye'de nüfusun çoğunluğu Müslüman'dır. Ankara, Türkiye'nin başkenti ve ikinci en kalabalık şehri; İstanbul ise, Türkiye'nin en kalabalık şehri, ekonomik ve finansal merkezi ve aynı zamanda Avrupa'nın en kalabalık şehridir.</p>
                            <p><strong>Fotoğraf:</strong></p> <Image src="/tu_logo.jpg" />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        {selectedComplaint && (selectedComplaint.class)} sınıfını kapat
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Complaints;
