import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert } from 'react-bootstrap';

const ClassroomManager = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [formData, setFormData] = useState({
        className: '',
        capacity: '',
        examCapacity: '',
        block: 'A',
        type: 'Sınıf',
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = () => {
        if (!formData.className || !formData.capacity || !formData.examCapacity) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        setClassrooms([...classrooms, { ...formData, isClosed: false }]);
        setFormData({ className: '', capacity: '', examCapacity: '', block: 'A', type: 'Sınıflar' });
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(classrooms[index]);
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        const updatedClassrooms = [...classrooms];
        updatedClassrooms[editIndex] = formData;
        setClassrooms(updatedClassrooms);
        setShowEditModal(false);
        setEditIndex(null);
        setFormData({ className: '', capacity: '', examCapacity: '', block: 'A', type: 'Sınıflar' });
    };

    const handleDelete = () => {
        setClassrooms(classrooms.filter((_, i) => i !== deleteIndex));
        setShowDeleteModal(false);
    };

    const handleCloseClassroom = (index) => {
        const updatedClassrooms = [...classrooms];
        updatedClassrooms[index].isClosed = !updatedClassrooms[index].isClosed;
        setClassrooms(updatedClassrooms);
    };

    return (
        <Container className="mt-4">
            <h4>Sınıf Ekle/Düzenle</h4>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    Lütfen tüm alanları doldurun!
                </Alert>
            )}
            <Row>
                <Col md={12}>
                    <Form>
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group controlId="className">
                                    <Form.Label>Sınıf Adı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="className"
                                        value={formData.className}
                                        onChange={handleInputChange}
                                        placeholder="Sınıf adı girin"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group controlId="capacity">
                                    <Form.Label>Kapasite</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        placeholder="Kapasite girin"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group controlId="examCapacity">
                                    <Form.Label>Sınav Kapasitesi</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="examCapacity"
                                        value={formData.examCapacity}
                                        onChange={handleInputChange}
                                        placeholder="Sınav kapasitesi"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Form.Group controlId="block">
                                    <Form.Label>Blok</Form.Label>
                                    <Form.Select name="block" value={formData.block} onChange={handleInputChange}>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group controlId="type">
                                    <Form.Label>Derslik Tipi</Form.Label>
                                    <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                                        <option value="Sınıf">Sınıf</option>
                                        <option value="Amfi">Amfi</option>
                                        <option value="Laboratuvar">Laboratuvar</option>
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

            <h4 className="mt-4">Sınıf Listesi</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sınıf Adı</th>
                        <th>Kapasite</th>
                        <th>Sınav Kapasitesi</th>
                        <th>Blok</th>
                        <th>Derslik Tipi</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {classrooms.map((classroom, index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>
                                {classroom.isClosed ? (
                                    <span style={{ textDecoration: 'line-through red', color: 'black' }}>
                                        {classroom.className}
                                    </span>
                                ) : (
                                    classroom.className
                                )}
                                {classroom.isClosed && (
                                    <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '10px' }}>
                                        (SINIF KAPALI)
                                    </span>
                                )}
                            </td>
                            <td>{classroom.capacity}</td>
                            <td>{classroom.examCapacity}</td>
                            <td>{classroom.block}</td>
                            <td>{classroom.type}</td>
                            <td>
                                <Button size="sm" variant="warning" onClick={() => handleEdit(index)}>
                                    Düzenle
                                </Button>{' '}
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => {
                                        setDeleteIndex(index);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    Sil
                                </Button>{' '}
                                <Button
                                    size="sm"
                                    variant={classroom.isClosed ? 'success' : 'primary'}
                                    onClick={() => handleCloseClassroom(index)}
                                >
                                    {classroom.isClosed ? 'Sınıfı Aç' : 'Sınıfı Kapat'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sınıfı Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editClassName">
                            <Form.Label>Sınıf Adı</Form.Label>
                            <Form.Control
                                type="text"
                                name="className"
                                value={formData.className}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editCapacity" className="mt-2">
                            <Form.Label>Kapasite</Form.Label>
                            <Form.Control
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editExamCapacity" className="mt-2">
                            <Form.Label>Sınav Kapasitesi</Form.Label>
                            <Form.Control
                                type="number"
                                name="examCapacity"
                                value={formData.examCapacity}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editBlock" className="mt-2">
                            <Form.Label>Blok</Form.Label>
                            <Form.Select name="block" value={formData.block} onChange={handleInputChange}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="editType" className="mt-2">
                            <Form.Label>Derslik Tipi</Form.Label>
                            <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                                <option value="Sınıf">Sınıf</option>
                                <option value="Amfi">Amfi</option>
                                <option value="Laboratuvar">Laboratuvar</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Güncelle
                    </Button>
                </Modal.Footer>
            </Modal>

        
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sınıf Silme Onayı</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bu sınıfı silmek istediğinizden emin misiniz?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hayır
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Evet
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ClassroomManager;
