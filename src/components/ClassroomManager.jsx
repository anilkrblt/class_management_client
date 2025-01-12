import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
  Alert,
} from "react-bootstrap";
import { addRoom, deleteRoom, getAllRooms, updateRoom } from "../utils/RoomApiService";
import { getAllDepartments } from "../utils/DepartmentApiService";
import { getAllBuildings } from "../utils/BuildingApiService";

const ClassroomManager = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    examCapacity: "",
    buildingId: 1,
    roomType: 0,
    isProjectorWorking: true,
    isActive: true,
    departmentId: 1,
    equipment: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await getAllRooms();
        setClassrooms(data); // Dönüştürülmüş veriyi state'e atıyoruz
      } catch (err) {
        console.error("Sınıflar yüklenirken hata oluştu:", err);
      }
    };

    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    const rooms = await getAllRooms();
    setClassrooms(rooms)
  }

  console.log(classrooms);

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "buildingId" ? Number(value) : value, });
    console.log("name", name, "value", value)
  };


  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await getAllDepartments();
        setDepartments(data); // Dönüştürülmüş veriyi state'e atıyoruz
      } catch (err) {
        console.error("Bölümler yüklenirken hata oluştu:", err);
      }
    };

    fetchClassrooms();
  }, []);

  const [buildings, setBuildings] = useState([])
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await getAllBuildings();
        setBuildings(data); // Dönüştürülmüş veriyi state'e atıyoruz
      } catch (err) {
        console.error("Bölümler yüklenirken hata oluştu:", err);
      }
    };

    fetchClassrooms();
  }, []);

  console.log(departments)
  const buildId = (name) => {
    switch (name) {
      case "A Binası":
        return 1;
      case "B Binası":
        return 2;

    }
  }

  const build2Id = (id) => {
    switch (id) {
      case 1:
        return "A Binası";
      case 2:
        return "B Binası";

    }
  }
  const departmentsId = (name) => {
    switch (name) {
      case "Bilgisayar Mühendisliği":
        return 1;
      case "Makine Mühendisliği":
        return 2;
      case "Elektrik Elektronik Mühendisliği":
        return 3;
      case "Biyomedikal Mühendisliği":
        return 4;
      case "Endüstri Mühendisliği":
        return 5;

    }
  }

  console.log(formData)

  const handleAdd = async () => {
    if (!formData.name || !formData.capacity || !formData.examCapacity) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
 /*
    if (classrooms.some(classroom => classroom.name.includes(formData.name))){
      setShowAlert2(true);
      setTimeout(() => setShowAlert2(false), 3000);
      return
    }
      */
    const data = { ...formData }
    try {
      await addRoom(data);
      // Ders başarılı bir şekilde eklendiyse listeye ekle
     /* setClassrooms([...classrooms, {
        ...formData, isActive: true,
        buildingName: buildings.find((item) => item.buildingId === Number(formData.buildingId)).name,
        departmentName: departments.find((item) =>
          item.departmentId === Number(formData.departmentId)).name,
        roomType: Number(formData.roomType)
      }]);*/

      fetchClassrooms()

      // Formu sıfırla
      setFormData({
        name: "",
        capacity: "",
        examCapacity: "",
        buildingId: 1,
        roomType: 0,
        isProjectorWorking: true,
        isActive: true,
        departmentId: 1,
        equipment: ""
      });

    } catch (error) {
      alert("Sınıf eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

console.log(classrooms)
  const handleEdit = (index) => {

    console.log(classrooms[index])

    setEditIndex(index);
    console.log(classrooms[index])
    setFormData({
      ...classrooms[index], buildingId: buildings.find((item) => item.name === classrooms[index].buildingName).buildingId
      , departmentId: departments.find((item) =>
        item.name === classrooms[index].departmentName).departmentId
    });

    setShowEditModal(true);
  };

const [showAlert3 , setShowAlert3] = useState(false)
  const handleUpdate = async () => {

/*
    if (classrooms.some(classroom => classroom.name.includes(formData.name))){
      setShowAlert3(true);
      setTimeout(() => setShowAlert3(false), 3000);
      return
    }
*/

    const updatedClassrooms = [...classrooms];
    const changeActive = classrooms[editIndex]
    const id = classrooms[editIndex].roomId


    const data = {
      name: formData.name,
      capacity: formData.capacity,
      examCapacity: formData.examCapacity,
      isProjectorWorking: changeActive.isProjectorWorking,
      equipment: "",
      isActive: changeActive.isActive,
      roomType: formData.roomType, //room type fonksiyonu yazılacak switch caseli
      departmentId: formData.departmentId,
      buildingId: formData.buildingId
    }
    console.log(data)

    try {
      await updateRoom(id, data)
      updatedClassrooms[editIndex] = {
        ...formData, departmentName: departments.find((item) =>
          item.departmentId === Number(formData.departmentId)).name,
        buildingName: buildings.find((item) => item.buildingId === Number(formData.buildingId)).name,
        roomType: Number(formData.roomType)
      };
      console.log(updatedClassrooms)
      //setClassrooms(updatedClassrooms,);
      fetchClassrooms()
      setShowEditModal(false);
      setEditIndex(null);
    } catch (error) {
      alert("Sınıf güncellenirken bir hata oluştu. Lütfen tekrar deneyin.")
    }


    setFormData({

      name: "",
      capacity: "",
      examCapacity: "",
      buildingId: 1,
      roomType: 0,
      isProjectorWorking: true,
      isActive: true,
      departmentId: 1,
      equipment: ""
    });
  };


  const [deleteRoomId, setDeleteRoomId] = useState(null);




  const handleDelete = async () => {

    try {
      await deleteRoom(deleteRoomId)
      // setClassrooms(classrooms.filter((_, i) => i !== deleteIndex));
      fetchClassrooms()
      setShowDeleteModal(false);
    } catch (error) {
      alert("Ders silinirken bir hata oluştu. Lütfen tekrar deneyin.")
    }
  };

  const handleCloseClassroom = async (index) => {

    const updatedClassrooms = [...classrooms];




    const changeActive = classrooms[index]

    const id = classrooms[index].roomId


    const data = {
      name: changeActive.name,
      capacity: changeActive.capacity,
      examCapacity: changeActive.examCapacity,
      isProjectorWorking: changeActive.isProjectorWorking,
      equipment: "",
      isActive: !changeActive.isActive,
      roomType: changeActive.roomType, //room type fonksiyonu yazılacak switch caseli
      departmentId: departments.find((item) =>
        item.name === changeActive.departmentName).departmentId,
      buildingId: buildings.find((item) => item.name === changeActive.buildingName).buildingId
    }

    try {
      await updateRoom(id, data)
      updatedClassrooms[index].isActive = !updatedClassrooms[index].isActive;
     // setClassrooms(updatedClassrooms);
     fetchClassrooms()
    } catch (error) {
      alert("hata")
    }
  };

  const toggleProjection = async (index) => {
    const updatedClassrooms = [...classrooms];

    const changeProjection = classrooms[index]
    const id = classrooms[index].roomId

    console.log(changeProjection)
    const data = {
      name: changeProjection.name,
      capacity: changeProjection.capacity,
      examCapacity: changeProjection.examCapacity,
      isProjectorWorking: !changeProjection.isProjectorWorking,
      equipment: "",
      isActive: changeProjection.isActive,
      roomType: changeProjection.roomType,
      departmentId: departments.find((item) =>
        item.name === changeProjection.departmentName).departmentId,
      buildingId: buildings.find((item) => item.name === changeProjection.buildingName).buildingId
    }

    try {
      await updateRoom(id, data)
      updatedClassrooms[index].isProjectorWorking = !updatedClassrooms[index].isProjectorWorking;
   //   setClassrooms(updatedClassrooms);
      fetchClassrooms()
    } catch (error) {
      alert("hata")
    }
  };

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [addLessonSectionShow, setAddLessonSectionShow] = useState(false)


  return (
    <Container className="mt-4">

      <Row>
        <Col md="auto"><h4>Sınıf Ekle/Düzenle</h4></Col>
        <Col md="auto"><Button
          variant={`${addLessonSectionShow ? "success" : "outline-success"}`}
          onClick={() => setAddLessonSectionShow(!addLessonSectionShow)}>Yeni sınıf ekle</Button></Col>
      </Row>

      {showAlert && (
        <Alert variant="danger" className="mt-2" onClose={() => setShowAlert(false)} dismissible>
          Lütfen tüm alanları doldurun!
        </Alert>
      )}


      {addLessonSectionShow && <Row className="mt-1">
        <Col md={12}>
          <Form>
            <Row className="mb-3 justify-content-center">
              <Col md={3}>
                <Form.Group controlId="className">
                  <Form.Label>Sınıf Adı</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
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
            </Row>
            <Row className="mb-3 justify-content-center"> 
              <Col md={2}>
                <Form.Group controlId="block">
                  <Form.Label>Blok</Form.Label>
                  <Form.Select name="buildingId" value={formData.buildingId} onChange={handleInputChange}>

                    {buildings.map(build => (
                      <option key={build.buildingId} value={build.buildingId}>{build.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="type">
                  <Form.Label>Sınıf Tipi</Form.Label>
                  <Form.Select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                  >
                    <option value={0}>Derslik</option>
                    <option value={5}>Amfi</option>
                    <option value={2}>Bilgisayar Laboratuvarı</option>
                    <option value={1}>Elektrik Laboratuvarı</option>
                    <option value={3}>Genetik Laboratuvarı</option>
                    <option value={4}>Gıda Laboratuvarı</option>
                    <option value={6}>Makine Laboratuvarı</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group controlId="department">
                  <Form.Label className='ms-1'>Bölüm</Form.Label>
                  <Form.Select name="departmentId" value={formData.departmentId} onChange={handleInputChange}>

                    {departments.map(department => (
                      <option key={department.departmentId} value={department.departmentId}>{department.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={1}>
                <Button variant="success" className="mt-4" onClick={handleAdd}>
                  Ekle
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>}

      <Row className="my-2 align-items-center">
        <Col>
          <h4 className="mt-">Sınıf Listesi</h4>
        </Col>
        <Col md={3}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sınıf ara..."
            />
          </Form.Group>
        </Col>
      </Row>

      {filteredClassrooms.length === 0 ? (
        <p className="text-center fs-5 fw-semibold">Sınıf bulunamadı!</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Sınıf Adı</th>
              <th>Kapasite</th>
              <th>Sınav Kapasitesi</th>
              <th>Projeksiyon</th>
              <th>Blok</th>
              <th>Sınıf Tipi</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredClassrooms.map((classroom, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {!classroom.isActive ? (
                    <span
                      style={{
                        textDecoration: "line-through red",
                        color: "black",
                      }}
                    >
                      {classroom.name}
                    </span>
                  ) : (
                    classroom.name
                  )}
                  {!classroom.isActive && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        marginLeft: "10px",
                      }}
                    >
                      (SINIF KAPALI)
                    </span>
                  )}
                </td>
                <td>{classroom.capacity}</td>
                <td>{classroom.examCapacity}</td>
                <td>
                  {classroom.isProjectorWorking === true ? "Var" : "Yok"

                  }{" "}
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => { toggleProjection(index); }}
                  >
                    Değiştir
                  </Button>
                </td>
                <td>{classroom.buildingName}</td>
                <td>
                  {(() => {
                    switch (classroom.roomType) {
                      case 0:
                        return <p>Derslik</p>;
                      case 5:
                        return <p>Amfi</p>;
                      case 2:
                        return <p>Bilgisayar Laboratuvarı</p>;
                      case 1:
                        return <p>Elektrik Laboratuvarı</p>;
                      case 3:
                        return <p>Genetik Laboratuvarı</p>;
                      case 4:
                        return <p>Gıda Laboratuvarı</p>;
                      case 6:
                        return <p>Makine Laboratuvarı</p>;


                    }
                  })()}
                </td>

                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(index)}
                  >
                    Düzenle
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      setDeleteIndex(index);
                      setDeleteRoomId(classroom.roomId)
                      setShowDeleteModal(true);
                    }}
                  >
                    Sil
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant={!classroom.isActive ? "success" : "primary"}
                    onClick={() => handleCloseClassroom(index)}
                  >
                    {!classroom.isActive ? "Sınıfı Aç" : "Sınıfı Kapat"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
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
                name="name"
                value={formData.name}
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
              <Form.Select name="buildingId" value={formData.buildingId} onChange={handleInputChange}>

                {buildings.map(build => (
                  <option key={build.buildingId} value={build.buildingId}>{build.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="editType" className="mt-2">
              <Form.Label>Sınıf Tipi</Form.Label>
              <Form.Select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
              >
                <option value={0}>Derslik</option>
                <option value={5}>Amfi</option>
                <option value={2}>Bilgisayar Laboratuvarı</option>
                <option value={1}>Elektrik Laboratuvarı</option>
                <option value={3}>Genetik Laboratuvarı</option>
                <option value={4}>Gıda Laboratuvarı</option>
                <option value={6}>Makine Laboratuvarı</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label className='ms-1'>Bölüm</Form.Label>
              <Form.Select name="departmentId" value={formData.departmentId} onChange={handleInputChange}>

                {departments.map(department => (
                  <option key={department.departmentId} value={department.departmentId}>{department.name}</option>
                ))}
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
          <Button variant="danger" onClick={() => handleDelete()}>
            Evet
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClassroomManager;