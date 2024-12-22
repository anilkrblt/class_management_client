import React, { useState } from 'react';
import { Card, Button, Row, Col, Container, Modal, Image } from 'react-bootstrap';

const ClassReservationRequests = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const [requests, setRequests] = useState([
        { name: "Can Öztürk", exp: "Ek ders isteği", class: "L201", lesson: "Diferansiyel denklemler" },
        { name: "Zeynep Şentürk", exp: "Ek ders isteği", class: "D201" },
        { name: "Melih Yaşar", exp: "Ek ders isteği", class: "L208" },
        { name: "Sıla Yıldız", exp: "Kulüp toplantısı", class: "L104" },
        { name: "Ali Duru", exp: "Ek ders isteği", class: "D204" },
        { name: "Can Öztürk", exp: "Ek ders isteği", class: "L201", lesson: "Diferansiyel denklemler" },
        { name: "Zeynep Şentürk", exp: "Ek ders isteği", class: "D201" },
        { name: "Melih Yaşar", exp: "Ek ders isteği", class: "L208" },
        { name: "Sıla Yıldız", exp: "Kulüp toplantısı", class: "L104" },
        { name: "Ali Duru", exp: "Ek ders isteği", class: "D204" },
        { name: "Can Öztürk", exp: "Ek ders isteği", class: "L201", lesson: "Diferansiyel denklemler" },
        { name: "Zeynep Şentürk", exp: "Ek ders isteği", class: "D201" },
        { name: "Melih Yaşar", exp: "Ek ders isteği", class: "L208" },
        { name: "Sıla Yıldız", exp: "Kulüp toplantısı", class: "L104" },
        { name: "Ali Duru", exp: "Ek ders isteği", class: "D204" },
        { name: "Can Öztürk", exp: "Ek ders isteği", class: "L201", lesson: "Diferansiyel denklemler" },
        { name: "Zeynep Şentürk", exp: "Ek ders isteği", class: "D201" },
        { name: "Melih Yaşar", exp: "Ek ders isteği", class: "L208" },
        { name: "Sıla Yıldız", exp: "Kulüp toplantısı", class: "L104" },
        { name: "Ali Duru", exp: "Ek ders isteği", class: "D204" },
        { name: "Can Öztürk", exp: "Ek ders isteği", class: "L201", lesson: "Diferansiyel denklemler" },
        { name: "Zeynep Şentürk", exp: "Ek ders isteği", class: "D201" },
        { name: "Melih Yaşar", exp: "Ek ders isteği", class: "L208" },
        { name: "Sıla Yıldız", exp: "Kulüp toplantısı", class: "L104" },
        { name: "Ali Duru", exp: "Ek ders isteği", class: "D204" },
    ]);

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

    const handleShowModal = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    const handleRequestAction = (request) => {
        setRequests((prevRequests) =>
            prevRequests.filter((item) => item !== request)
        );
        setShowModal(false);
    };

    return (
        <Container className='rounded-4 bg-light pb-2'>
            <h2 className="my-3 text-center sticky-top bg-light" style={{ zIndex: 10 }}>Kulüp Rezervasyon İstekleri</h2>
            {requests.length > 0 ? (
                requests.map((item, index) => (
                    <Card
                        key={index}
                        className="my-2 ps-5"
                        style={{ backgroundColor: index % 2 === 0 ? '#fff9ed' : 'white' }}
                    >
                        <Row className="d-flex align-items-center justify-content-between w-100">
                            <Col md={1}>
                                <Image
                                    src={`https://cdn.auth0.com/avatars/${formatToInitials(item.name)}.png`} // İlk harflerden oluşan URL
                                    roundedCircle
                                    width={50}
                                    className="me-3"
                                />
                            </Col>
                            <Col md={3}>
                                <Container className="pt-2">
                                    <h5>{item.name}</h5>
                                    <p>IEEE</p>
                                </Container>
                            </Col>
                            <Col md={2}>
                                <h3>{item.class}</h3>
                            </Col>
                            <Col md={1}>
                                <Col className="fs-4 fw-bold ms-2">15</Col>
                                <Col className="fs-5 text-secondary">Kasım</Col>
                            </Col>
                            <Col md={2}>
                                <h5>13:00 - 15:00</h5>
                            </Col>
                            <Col md={3}>
                                <Row>
                                    <Col>
                                        <Button variant="secondary" onClick={() => handleShowModal(item)}>
                                            İncele
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="success" onClick={() => handleRequestAction(item)}>
                                            Onayla
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={() => handleRequestAction(item)}>
                                            Reddet
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                ))
            ) : (
                <p className="text-center">Şu anda hiç sınıf rezervasyon isteği yok.</p>
            )}

            {/* Modal */}
            {selectedRequest && (
                <Modal size='xl' show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Rezervasyon Detayları <Image src='/ieee.png' width={80} /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Row>
                                    <p><strong>Kulüp:</strong> IEEE</p>

                                </Row>

                                <p><strong>Ad soyad:</strong> {selectedRequest.name}</p>
                                <p><strong>Öğrenci no:</strong> 1215161445</p>
                                <p><strong>Bölümü: </strong>Elektrik-Elektronik Mühendisliği</p>


                            </Col>
                            <Col>
                                <p><strong>Yer: </strong>{selectedRequest.class}</p>
                                <p><strong>Tarih saat: </strong>15 Kasım 13:00 Cuma</p>
                                <p><strong>Etkinlik adı: </strong>Python etkinliği</p>
                                <p><strong>Katılım formu: </strong>
                                    <Button
                                        variant="link"
                                        onClick={() => window.open("https://www.google.com/", '_blank', 'noopener,noreferrer')}
                                    >
                                        Formu Aç
                                    </Button></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <Image src='/ieee_afis.jpg' width={260} />
                            </Col>
                            <Col >  <p><strong>Davet metni: </strong>Türkiye, resmî adıyla Türkiye Cumhuriyeti, topraklarının büyük bölümü Batı Asya'da Anadolu'da, diğer bir bölümü ise Güneydoğu Avrupa'nın uzantısı Doğu Trakya'da olan kıtalararası bir ülkedir. Batıda Bulgaristan ve Yunanistan, doğuda Gürcistan, Ermenistan, İran ve Azerbaycan, güneyde ise Irak ve Suriye ile sınır komşusudur. Güneyini Kıbrıs ve Akdeniz, batısını Ege Denizi, kuzeyini ise Karadeniz çevreler. Marmara Denizi ise İstanbul Boğazı ve Çanakkale Boğazı ile birlikte Anadolu'yu Trakya'dan, yani Asya'yı Avrupa'dan ayırır. Resmî olarak laik bir devlet olan Türkiye'de nüfusun çoğunluğu Müslüman'dır. Ankara, Türkiye'nin başkenti ve ikinci en kalabalık şehri; İstanbul ise, Türkiye'nin en kalabalık şehri, ekonomik ve finansal merkezi ve aynı zamanda Avrupa'nın en kalabalık şehridir.</p></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => handleRequestAction(selectedRequest)}>Onayla</Button>
                        <Button variant="danger" onClick={() => handleRequestAction(selectedRequest)}>Reddet</Button>
                        <Button variant="secondary" onClick={handleCloseModal}>Kapat</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default ClassReservationRequests;
