import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert, Pagination } from 'react-bootstrap';
import { addInstructor, addLecture, deleteInstructor, deleteLecture, getAllLectures, unassignCourse, updateLecture } from '../utils/LectureApiService';
import { getAllInstructors } from '../utils/InstructorsApiService';
import { getAllDepartments } from '../utils/DepartmentApiService';


const LessonManager = () => {
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        const fetchLectures = async () => {
            const lectures = await getAllLectures();
            setLessons(lectures)
        };

        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        const lecture = await getAllLectures();
        setLessons(lecture)
    }

    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        const fetchInstructors = async () => {
            const instructor = await getAllInstructors();
            setInstructors(instructor)
        };

        fetchInstructors();
    }, []);
    console.log(instructors)
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        const fetchDepartments = async () => {
            const department = await getAllDepartments();
            setDepartments(department)
        };

        fetchDepartments();
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
    const [selectedGrades, setSelectedGrades] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);

    const [showAll, setShowAll] = useState(true);
    const [showAll2, setShowAll2] = useState(true);
    const [showAll3, setShowAll3] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('');
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

    const toggleGradeSelection = (department) => {
        const updatedDepartments = selectedGrades.includes(department)
            ? selectedDepartments.filter((d) => d !== department)
            : [...selectedGrades, department];

        setSelectedGrades(updatedDepartments);
        setShowAll2(updatedDepartments.length === 0);
    };

    const toggleTermSelection = (department) => {
        const updatedDepartments = selectedTerms.includes(department)
            ? selectedDepartments.filter((d) => d !== department)
            : [...selectedTerms, department];

        setSelectedTerms(updatedDepartments);
        setShowAll3(updatedDepartments.length === 0);
    };


    const items = departments.map((department) => (
        <Pagination.Item
            key={department.name}
            active={selectedDepartments.includes(department.name)}
            onClick={() => toggleDepartmentSelection(department.name)}
        >
            {department.name}
        </Pagination.Item>
    ));

    const grades = [1, 2, 3, 4].map((grade) => (
        <Pagination.Item
            key={grade}
            active={selectedGrades.includes(grade)}
            onClick={() => toggleGradeSelection(grade)}
        >
            {grade}. sınıf
        </Pagination.Item>
    ));

    const terms = ["güz", "bahar"].map((term) => (
        <Pagination.Item
            key={term}
            active={selectedTerms.includes(term)}
            onClick={() => toggleTermSelection(term)}
        >
            {term}
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

    console.log(selectedInstructor)
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
            fetchLectures()

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
        setSelectedInstructor(instructors[index]);
        setSelectedLesson(lessons[index])
        setShowInstructorModal(true);
    };
    const [selectedLectureInstructors, setSelectedLectureInstructors] = useState([])
    const handleRemoveInstructor = (lessonIndex) => {
        setSelectedLesson(lessons[lessonIndex]);

        setShowRemoveModal(true);
    };
console.log(selectedLesson)

    const handleConfirmRemove = async (instructorIndex) => {



        const instructor= selectedLesson.instructors[instructorIndex]
console.log(selectedLesson)
        try {
            await unassignCourse(Number(instructor.instructorId), selectedLesson.code)
            fetchLectures()
        } catch (error) {
            alert("Öğretim üyesi kaldırılırken hata oluştu.")
        }

        const updatedLessons = [...lessons];

        const lessonIndex = updatedLessons.findIndex(
            lesson => lesson.code === selectedLesson.code);
        setSelectedLectureInstructors(lessons[lessonIndex]?.instructors)

        if (lessonIndex !== -1) {
            updatedLessons[lessonIndex].instructors.splice(instructorIndex, 1);
        }
        console.log(selectedLesson.instructors)
        //deleteInstructor( ,selectedLesson.code)

        setLessons(updatedLessons);
    };


    const handleConfirmInstructor = async () => {
        const updatedLessons = [...lessons];
        if (!updatedLessons[currentLessonIndex].instructors.some(
            (instructor) => Number(instructor.instructorId) === Number(selectedInstructor.instructorId)
        )) {

            try {
                await addInstructor(Number(selectedInstructor.instructorId), selectedLesson.code)
                fetchLectures()
                setShowInstructorModal(false);
            } catch (error) {
                alert("Öğretim üyesi eklenirken bir hata oluştu.")
            }
        } else {
            setShowMessage(true)

        }


    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(lessons[index]);
        setShowEditModal(true);
    };


    const handleUpdate = async () => {
        const updatedLessons = [...lessons];
        updatedLessons[editIndex] = formData;

        const id = lessons[editIndex].code
        const updateLecturew = {
            name: formData.name,
            departmentId: departments.find((item) => item.name === formData.department).departmentId,
            grade: Number(formData.grade),
            term: formData.term
        }


        try {
            await updateLecture(id, updateLecturew)
            fetchLectures()
            setShowEditModal(false);
            setEditIndex(null);
        } catch (error) {
            alert("Ders güncellenirken bir hata oluştu. Lütfen tekrar deneyin.")
        }


        setFormData({ name: '', code: '', department: 'Bilgisayar Mühendisliği', grade: '1', term: 'Güz', instructors: [] });
    };

    const handleDelete = async () => {

        try {

            await deleteLecture(deleteLectureCode);

            fetchLectures()

            setShowDeleteModal(false);
            console.log("Ders listesi güncellendi.");
        } catch (error) {
            alert("Ders silinirken bir hata oluştu. Lütfen tekrar deneyin.");
        };
    }

    const filteredLessons = lessons.filter((lesson) => {
        const lessonName = lesson.name?.toLowerCase() || ""; // Varsayılan olarak boş string
        const lessonId = lesson.lessonId?.toLowerCase() || ""; // Varsayılan olarak boş string

        const matchesSearchTerm = lessonName.includes(searchTerm.toLowerCase()) ||
            lessonId.includes(searchTerm.toLowerCase());

        return (
            (
                showAll || (selectedDepartments.includes(lesson.department)))
            &&
            (showAll2 || selectedGrades.includes(lesson.grade)) &&
            (showAll3 || selectedTerms.includes(lesson.term))


        ) && matchesSearchTerm;
    });


    const [showInstructorModal, setShowInstructorModal] = useState(false); // Modal kontrolü
    const [currentLessonIndex, setCurrentLessonIndex] = useState(null); // Hangi dersin seçildiği
    // Modal'da seçilen öğretim üyesi
    const [addLessonSectionShow, setAddLessonSectionShow] = useState(false)


    console.log(selectedInstructor)


    return (
        <Container className="mt-4">
            <Row >
                <Col md="auto"><h4>Ders Ekle/Düzenle</h4></Col>
                <Col md="auto">
                    <Button
                        variant={`${addLessonSectionShow ? "success" : "outline-success"}`}
                        onClick={() => setAddLessonSectionShow(!addLessonSectionShow)}>Yeni ders ekle</Button></Col>
            </Row>

            {showAlert && (
                <Alert variant="danger" className='mt-2' onClose={() => setShowAlert(false)} dismissible>
                    Lütfen tüm alanları doldurun!
                </Alert>
            )}
            {addLessonSectionShow && <Row className='mt-2'>
                <Col md={12}>
                    <Form>
                        <Row className="mb-3 justify-content-center">
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
                                            <option key={department.departmentId} value={department.name}>{department.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3 justify-content-center">
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
                                <Button variant="outline-success" className='mt-4' onClick={handleAdd}>
                                    Ekle
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>}

            <h4 className="mt-4">Ders Listesi</h4>


            <Row>
            <Row className='justify-content-center d-flex'>
<Col md="auto">
<Form.Control
                    type="text"
                    placeholder="Ders ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                /></Col>
<Col md="auto">
    <Pagination className="mb-3 custom-pagination">
        <Pagination.Item
            onClick={() => {
                setShowAll2(true);
                setSelectedDepartments([]);
            }}
            active={showAll2}
        >
            Tümü
        </Pagination.Item>
        {grades}
    </Pagination>
</Col>
<Col md="auto">
    <Pagination className="mb-3 custom-pagination">
        <Pagination.Item
            onClick={() => {
                setShowAll3(true);
                setSelectedDepartments([]);
            }}
            active={showAll3}
        >
            Tümü
        </Pagination.Item>
        {terms}
    </Pagination>
</Col>
</Row>
                <Col md={12}>
                    <div className="overflow-auto my-2">
                        <Pagination className="mb-3 custom-pagination">
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
                                        ? lesson.instructors
                                            .map(ins => ins.instructorName) // Sadece instructorName değerlerini al
                                            .join(", ")
                                        : 'Atanmadı'}
                                    <Button size="sm" className="ms-2" onClick={() => handleAddInstructor(index)}>
                                        Ekle
                                    </Button>
                                    <Button size='sm' className='ms-2' variant='danger' onClick={() => { handleRemoveInstructor(index); }}>
                                        Kaldır
                                    </Button>
                                </td>


                                <td>
                                    <Button size="sm" variant="warning" onClick={() => handleEdit(index)}>Düzenle</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => {
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
                                    readOnly
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
                                        <option key={department.departmentId} value={department.name}>{department.name}</option>
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
                            value={selectedInstructor?.instructorId || ''}
                            onChange={(e) => {
                                const selectedOption = e.target.options[e.target.selectedIndex];
                                setSelectedInstructor({
                                    instructorId: e.target.value,
                                    instructorName: selectedOption.getAttribute('data-instructor-name'),
                                });
                            }}
                        >
                            {instructors.map((instructor) => (
                                <option
                                    key={instructor.instructorId}
                                    value={instructor.instructorId}
                                    data-instructor-name={instructor.instructorName}
                                >
                                    {instructor.instructorName}
                                </option>
                            ))}
                        </Form.Select>

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowInstructorModal(false); setShowMessage(false) }}>
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