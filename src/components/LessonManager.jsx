import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert, Pagination } from 'react-bootstrap';

const LessonManager = () => {
    const [lessons, setLessons] = useState([]);
    const [formData, setFormData] = useState({
        lessonName: '',
        lessonId: '',
        department: 'Bilgisayar Mühendisliği',
        grade: '1',
        season: 'Güz',
        instructors: [],
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDepartmentSelection = (department) => {
        const updatedDepartments = selectedDepartments.includes(department)
            ? selectedDepartments.filter((d) => d !== department)
            : [...selectedDepartments, department];

        setSelectedDepartments(updatedDepartments);
        setShowAll(updatedDepartments.length === 0);
    };

    const departments = [
        "Bilgisayar Mühendisliği",
        "Makine Mühendisliği",
        "Elektrik-Elektronik Mühendisliği",
        "Gıda Mühendisliği",
        "Genetik Mühendisliği"
    ];



    const items = departments.map((department) => (
        <Pagination.Item
            key={department}
            active={selectedDepartments.includes(department)}
            onClick={() => toggleDepartmentSelection(department)}
        >
            {department}
        </Pagination.Item>
    ));

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'instructors') {
            // Birden fazla seçenek seçildiği için, yeni bir dizi oluşturuyoruz
            setFormData(prevData => ({
                ...prevData,
                [name]: Array.from(e.target.selectedOptions, option => option.value)
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    const handleAdd = () => {
        if (!formData.lessonName || !formData.lessonId || formData.instructors.length === 0) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        console.log(formData)
        setLessons([...lessons, { ...formData }]);
        setFormData({ lessonName: '', lessonId: '', department: 'Bilgisayar Mühendisliği', grade: '1', season: 'Güz', instructors: [] });
    };

    const handleAddInstructor = (index) => {
        setCurrentLessonIndex(index);
        setSelectedInstructor(instructors[0]); // Varsayılan olarak ilk öğretim üyesi
        setShowInstructorModal(true);
    };

    const handleConfirmInstructor = () => {
        const updatedLessons = [...lessons];
        if (!updatedLessons[currentLessonIndex].instructors.includes(selectedInstructor)) {
            updatedLessons[currentLessonIndex].instructors.push(selectedInstructor);
            setLessons(updatedLessons);
        } else {
            alert("Bu öğretim üyesi zaten ekli!");
        }
        setShowInstructorModal(false);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(lessons[index]);
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        const updatedLessons = [...lessons];
        updatedLessons[editIndex] = formData;
        setLessons(updatedLessons);
        setShowEditModal(false);
        setEditIndex(null);
        setFormData({ lessonName: '', lessonId: '', department: 'Bilgisayar Mühendisliği', grade: '1', season: 'Güz', instructors: [] });
    };

    const handleDelete = () => {
        setLessons(lessons.filter((_, i) => i !== deleteIndex));
        setShowDeleteModal(false);
    };

    const filteredLessons = lessons.filter((lesson) => {
        const matchesSearchTerm = lesson.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.lessonId.toLowerCase().includes(searchTerm.toLowerCase());

        return (showAll || selectedDepartments.includes(lesson.department)) && matchesSearchTerm;
    });

    const [showInstructorModal, setShowInstructorModal] = useState(false); // Modal kontrolü
    const [currentLessonIndex, setCurrentLessonIndex] = useState(null); // Hangi dersin seçildiği
    const [selectedInstructor, setSelectedInstructor] = useState(''); // Modal'da seçilen öğretim üyesi

    const instructors = ["Altan Mesut", "Emir Öztürk", "Aydın Carus"]; // Öğretim üyeleri listesi


    //  console.log(lessons)


    return (
        <Container className="mt-4">
            <h4>Ders Ekle/Düzenle</h4>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    Lütfen tüm alanları doldurun!
                </Alert>
            )}
            <Row>
                <Col md={12}>
                    <Form>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Group controlId="lessonName">
                                    <Form.Label className='ms-1'>Ders Adı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lessonName"
                                        value={formData.lessonName}
                                        onChange={handleInputChange}
                                        placeholder="Ders adı girin"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group controlId="lessonId">
                                    <Form.Label className='ms-1'>Ders Kodu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lessonId"
                                        value={formData.lessonId}
                                        onChange={handleInputChange}
                                        placeholder="Ders kodu girin"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="department">
                                    <Form.Label className='ms-1'>Bölüm</Form.Label>
                                    <Form.Select name="department" value={formData.department} onChange={handleInputChange}>
                                        {departments.map(department => (
                                            <option key={department} value={department}>{department}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Form.Group controlId="grade">
                                    <Form.Label className='ms-1'>Sınıf</Form.Label>
                                    <Form.Select name="grade" value={formData.grade} onChange={handleInputChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group controlId="season">
                                    <Form.Label className='ms-1'>Dönem</Form.Label>
                                    <Form.Select name="season" value={formData.season} onChange={handleInputChange}>
                                        <option value="Güz">Güz</option>
                                        <option value="Bahar">Bahar</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="instructors">
                                    <Form.Label className="ms-1">Öğretim Üyesi</Form.Label>
                                    <Form.Select
                                        name="instructors"
                                        value={formData.instructors}
                                        onChange={handleInputChange}
                                    >
                                        <option>Seçin</option>
                                        {instructors.map(instructor => (
                                            <option key={instructor} value={instructor}>
                                                {instructor}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </Col>
                            <Col md={1}>
                                <Button variant="primary" onClick={handleAdd}>
                                    Ekle
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

            <h4 className="mt-4">Ders Listesi</h4>

            <Row>
                <Col>
                    <Pagination className="mb-3">
                        <Pagination.Item
                            onClick={() => {
                                setShowAll(true);
                                setSelectedDepartments([]);
                            }}
                            active={showAll}
                        >
                            Tümü
                        </Pagination.Item>
                        {items}
                    </Pagination>
                </Col>
                <Col md={2}>
                    <Form.Control
                        type="text"
                        placeholder="Ders ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ders Adı</th>
                        <th>Ders Kodu</th>
                        <th>Bölüm</th>
                        <th>Sınıf</th>
                        <th>Dönem</th>
                        <th>Öğretim Üyesi</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLessons.map((lesson, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{lesson.lessonName}</td>
                            <td>{lesson.lessonId}</td>
                            <td>{lesson.department}</td>
                            <td>{lesson.grade}</td>
                            <td>{lesson.season}</td>
                            <td>
                                {lesson.instructors.length > 0
                                    ? lesson.instructors.join(', ')
                                    : 'Atanmadı'}
                                <Button size="sm" className="ms-2" onClick={() => handleAddInstructor(index)}>
                                    Öğretim Üyesi Ekle
                                </Button>
                            </td>


                            <td>
                                <Button size="sm" variant="warning" onClick={() => handleEdit(index)}>Düzenle</Button>{' '}
                                <Button size="sm" variant="danger" onClick={() => {
                                    setDeleteIndex(index);
                                    setShowDeleteModal(true);
                                }}>Sil</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Düzenleme Modalı */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ders Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="lessonName">
                            <Form.Label>Ders Adı</Form.Label>
                            <Form.Control
                                type="text"
                                name="lessonName"
                                value={formData.lessonName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {/* Diğer alanlar */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Kapat</Button>
                    <Button variant="primary" onClick={handleUpdate}>Güncelle</Button>
                </Modal.Footer>
            </Modal>

            {/* Silme Modalı */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ders Sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bu dersi silmek istediğinizden emin misiniz?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hayır</Button>
                    <Button variant="danger" onClick={handleDelete}>Evet</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showInstructorModal} onHide={() => setShowInstructorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Öğretim Üyesi Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="selectInstructor">
                        <Form.Label>Öğretim Üyesi Seçin</Form.Label>
                        <Form.Select
                            value={selectedInstructor}
                            onChange={(e) => setSelectedInstructor(e.target.value)}
                        >
                            {instructors.map((instructor) => (
                                <option key={instructor} value={instructor}>
                                    {instructor}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowInstructorModal(false)}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={handleConfirmInstructor}>
                        Ekle
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default LessonManager;
