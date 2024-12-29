import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert, Pagination } from 'react-bootstrap';
import { addLecture, deleteLecture, getAllLectures } from '../utils/LectureApiService';
import { getAllInstructors } from '../utils/InstructorsApiService';


const LessonManager = () => {
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        const fetchLectures = async () => {
            const lectures = await getAllLectures();
            setLessons(lectures)
        };

        fetchLectures();
    }, []);

    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        const fetchInstructors = async () => {
            const instructor = await getAllInstructors();
            setInstructors(instructor)
        };

        fetchInstructors();
    }, []);



    const [formData, setFormData] = useState({
        name: '',
        code: '',
        department: 'Bilgisayar Mühendisliği',
        grade: '1',
        term: 'Güz',
        instructors: [],
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [deleteLectureCode, setDeleteLectureCode] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showMessage, setShowMessage] = useState(false)

    const toggleDepartmentSelection = (department) => {
        const updatedDepartments = selectedDepartments.includes(department)
            ? selectedDepartments.filter((d) => d !== department)
            : [...selectedDepartments, department];

        setSelectedDepartments(updatedDepartments);
        setShowAll(updatedDepartments.length === 0);
    };

    const departments = [
        "Bilgisayar Mühendisliği",
        "Elektrik-Elektronik Mühendisliği",
        "Genetik ve Biyomühendislik",
        "Gıda Mühendisliği",
        "Makine Mühendisliği",
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



    const handleAdd = async () => {
    
        if (!formData.name || !formData.code || formData.instructors.length === 0) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        // Seçili instructors listesinden id'leri ekle
        const instructorsWithIds = formData.instructors.map((instructorName) => {
            const matchingInstructor = instructors.find(
                (instructor) => instructor.instructorName === instructorName
            );
            return matchingInstructor ? { instructorId: matchingInstructor.instructorId, instructorName: instructorName } : null;
        }).filter(Boolean); // Geçersiz (null) değerleri kaldır

        // Güncellenmiş formData ile işlemleri sürdür
        const updatedFormData = {
            ...formData,
            instructors: instructorsWithIds
        };

 

  
       try {
        // Ders ekleme fonksiyonunu çağır
        await addLecture(updatedFormData);

        // Ders başarılı bir şekilde eklendiyse listeye ekle
        setLessons([...lessons, updatedFormData]);

        // Formu sıfırla
        setFormData({
            name: '',
            code: '',
            department: 'Bilgisayar Mühendisliği',
            grade: '1',
            term: 'Güz',
            instructors: []
        });
    } catch (error) {
        alert("Ders eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
    };


    const handleAddInstructor = (index) => {
        setCurrentLessonIndex(index);
        setSelectedInstructor(instructors[0]); // Varsayılan olarak ilk öğretim üyesi
        setShowInstructorModal(true);
    };

    const handleRemoveInstructor = (lessonIndex) => {
        setSelectedLesson(lessons[lessonIndex]);
        setShowRemoveModal(true);
    };
    const handleConfirmRemove = (instructorIndex) => {
        const updatedLessons = [...lessons];

        const lessonIndex = updatedLessons.findIndex(
            lesson => lesson.code === selectedLesson.code);


        if (lessonIndex !== -1) {
            updatedLessons[lessonIndex].instructors.splice(instructorIndex, 1);
        }
        setLessons(updatedLessons);
    };

    const handleConfirmInstructor = () => {
        setShowMessage(false)
        const updatedLessons = [...lessons];

        // `selectedInstructor`'dan sadece name ve instructorId alınarak ekleniyor
        const instructorToAdd = {
            instructorId: selectedInstructor.instructorId,
            instructorName: selectedInstructor.instructorName
        };

        // Eğer bu eğitmen zaten ekli değilse, yeni eğitmeni ekleyin
        if (!updatedLessons[currentLessonIndex].instructors.some(instructor => instructor.instructorId === selectedInstructor.instructorId)) {
            updatedLessons[currentLessonIndex].instructors.push(instructorToAdd);
            setLessons(updatedLessons);
            setShowInstructorModal(false);
   
        } else {
            setShowMessage(true)
        }


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
        setFormData({ name: '', code: '', department: 'Bilgisayar Mühendisliği', grade: '1', term: 'Güz', instructors: [] });
    };

    const handleDelete = async () => {

        console.log("index",deleteIndex);
        console.log("lecture", deleteLectureCode);
        
        
       
  
        try {
            
            await deleteLecture(deleteLectureCode);
    
            setLessons(lessons.filter((_, i) => i !== deleteIndex));
           
            setShowDeleteModal(false);
            console.log("Ders listesi güncellendi.");
        } catch (error) {
            alert("Ders silinirken bir hata oluştu. Lütfen tekrar deneyin.");
    }; }

    const filteredLessons = lessons.filter((lesson) => {
        const lessonName = lesson.lessonName?.toLowerCase() || ""; // Varsayılan olarak boş string
        const lessonId = lesson.lessonId?.toLowerCase() || ""; // Varsayılan olarak boş string

        const matchesSearchTerm = lessonName.includes(searchTerm.toLowerCase()) ||
            lessonId.includes(searchTerm.toLowerCase());

        return (showAll || selectedDepartments.includes(lesson.department)) && matchesSearchTerm;
    });


    const [showInstructorModal, setShowInstructorModal] = useState(false); // Modal kontrolü
    const [currentLessonIndex, setCurrentLessonIndex] = useState(null); // Hangi dersin seçildiği
    const [selectedInstructor, setSelectedInstructor] = useState(''); // Modal'da seçilen öğretim üyesi



    console.log(lessons)


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
                                        name="name"
                                        value={formData.name}
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
                                        name="code"
                                        value={formData.code}
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
                                    <Form.Select name="term" value={formData.term} onChange={handleInputChange}>
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
                                            <option key={instructor.instructorId} value={instructor.id}>
                                                {instructor.instructorName}
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
                <Col md={10}>
                    <div className="overflow-auto">
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
                    </div>
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
            {filteredLessons.length === 0
                ? <p className='text-center fs-5 fw-semibold'>Ders bulunamadı.</p>
                : <Table striped bordered hover>
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
                                <td>{lesson.name}</td>
                                <td>{lesson.code}</td>
                                <td>{lesson.department}</td>
                                <td>{lesson.grade}</td>
                                <td>{lesson.term}</td>
                                <td>
                                    {lesson.instructors.length > 0
                                        ? lesson.instructors.map(ins => ins.instructorName)
                                        : 'Atanmadı'}
                                    <Button size="sm" className="ms-2" onClick={() => handleAddInstructor(index)}>
                                        Öğretim Üyesi Ekle
                                    </Button>
                                    <Button size='sm' variant='danger' onClick={() => handleRemoveInstructor(index)}>
                                        Öğretim Üyesi Kaldır
                                    </Button>
                                </td>


                                <td>
                                    <Button size="sm" variant="warning" onClick={() => handleEdit(index)}>Düzenle</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => {
                                        console.log(index)
                                        setDeleteIndex(index);
                                        setDeleteLectureCode(lesson.code)
                                        setShowDeleteModal(true);
                                    }}>Sil</Button>{' '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }


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
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <Form.Group controlId="lessonId">
                                <Form.Label className='ms-1'>Ders Kodu</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    placeholder="Ders kodu girin"
                                />
                            </Form.Group>
                            <Form.Group controlId="department">
                                <Form.Label className='ms-1'>Bölüm</Form.Label>
                                <Form.Select name="department" value={formData.department} onChange={handleInputChange}>
                                    {departments.map(department => (
                                        <option key={department} value={department}>{department}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="grade">
                                <Form.Label className='ms-1'>Sınıf</Form.Label>
                                <Form.Select name="grade" value={formData.grade} onChange={handleInputChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="season">
                                <Form.Label className='ms-1'>Dönem</Form.Label>
                                <Form.Select name="term" value={formData.term} onChange={handleInputChange}>
                                    <option value="Güz">Güz</option>
                                    <option value="Bahar">Bahar</option>
                                </Form.Select>
                            </Form.Group>
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
                    {showMessage && <p className='fw-semibold text-danger'>Bu öğretim üyesi zaten ekli!</p>}
                    <Form.Group controlId="selectInstructor">
                        <Form.Label>Öğretim Üyesi Seçin</Form.Label>
                        <Form.Select
                            value={selectedInstructor}
                            onChange={(e) => setSelectedInstructor(e.target.value)}
                        >
                            {instructors.map((instructor) => (
                                <option key={instructor.instructorId} value={instructor.instructorId}>
                                    {instructor.instructorName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowInstructorModal(false);  setShowMessage(false)}}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={handleConfirmInstructor}>
                        Ekle
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Öğretim Üyesi Kaldır</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedLesson && selectedLesson.instructors.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Öğretim Üyesi</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedLesson.instructors.map((instructor, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{instructor.instructorName}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleConfirmRemove(idx)}
                                            >
                                                Kaldır
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Bu ders için atanmış öğretim üyesi bulunmamaktadır.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default LessonManager;
