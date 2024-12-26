const Deneme = () => {


   
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [selectedTime, setSelectedTime] = useState(null)
    const [newEvent, setNewEvent] = useState({
        eventsName: '',
        eventsDate: '',
        eventsPlace: '',
        eventsDetails: '',
        eventsLink: '',
        eventsImage: ''
    });



    const handleCloseNewEventModal = () => {
        setShowNewEventModal(false);
    
        
    };

    const handleNewEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };


    const handleSaveNewEvent = () => {
      
        setNewEvent({
            eventsName: eventsName,
            eventsDate: '',
            eventsPlace: selectedCard.title,
            eventsDetails: '',
            eventsLink: '',
            eventsImage: ''
        });
        console.log(newEvent);
        
        
        setShowNewEventModal(false);
    };
    

    const [selectedCard, setSelectedCard] = useState(null);


    const start = moment(selectedTime?.start).format('DD MMMM dddd HH:mm'); // 19 Aralık Perşembe 05:00
    const end = moment(selectedTime?.end).format('HH:mm'); // 07:30

    const formattedDate = `${start} - ${end}`;


  return <Modal size="xl" show={showNewEventModal} onHide={handleCloseNewEventModal}>
    <Modal.Header closeButton>
      <Modal.Title>Yeni Etkinlik Oluştur</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Row className="align-items-center">
          <Col md={3}><p><strong>Kulübünüzün adı: </strong>IEEE</p></Col>
          <Col md={6}>
            <Form.Group controlId="formEventName" >
              <Row className="align-items-center">
                <Col md="auto" >
                  <Form.Label ><strong>Etkinlik adı:</strong></Form.Label>
                </Col>
                <Col md={7}>
                  <Form.Control
                    type="text"
                    placeholder="Etkinlik adı girin"
                    name="eventsName"
                    className=""
                    value={newEvent.eventsName}
                    onChange={handleNewEventChange}
                  />
                </Col>
              </Row>

            </Form.Group>
          </Col>
          <Col md={3}><strong>Yer: </strong>{selectedCard?.title}</Col>
        </Row>

        <Row className="align-items-center mt-2">
          <Col><Form.Group controlId="formEventLink" >
            <Row className="align-items-center">
              <Col md="auto" >
                <Form.Label ><strong>Etkinlik katılım formu linki:</strong></Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Linki yapıştırın"
                  name="eventsLink"
                  className=""
                  value={newEvent.eventsLink}
                  onChange={handleNewEventChange}
                />
              </Col>


            </Row>

          </Form.Group></Col>

          <Col md={4}><strong>Tarih ve saat: </strong> {formattedDate}</Col>
        </Row>


        <Form.Group controlId="formEventDetails">
          <Form.Label><strong>Davet metni:</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Etkinlik detayları"
            name="eventsDetails"
            value={newEvent.eventsDetails}
            onChange={handleNewEventChange}
          />
        </Form.Group>

        <Form.Group controlId="formEventImage">
          <Row className="d-flex justify-content-start w-50 align-items-center mt-2">
            <Col md={3}> <Form.Label><strong>Etkinlik afişi:</strong></Form.Label></Col>
            <Col md={9}> <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            /></Col>
          </Row>


          {selectedImage && (
            <div className="mt-3">
              <img
                src={selectedImage}
                alt="Afiş Önizleme"
                style={{ width: "150px", height: "auto", borderRadius: "8px" }}
              />
            </div>
          )}
        </Form.Group>
      </Form>
    </Modal.Body>
    <Row>
      <Col md={6} className="scrollable"> <ClassesList setSelectedCard={setSelectedCard} /></Col>
      <Col md={6}> <ClubEventCreateCalendar setSelectedTime={setSelectedTime} /> </Col>
    </Row>


    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseNewEventModal}>
        Kapat
      </Button>
      <Button variant="primary" onClick={handleSaveNewEvent}>
        Kaydet
      </Button>
    </Modal.Footer>
  </Modal>
}

export default Deneme