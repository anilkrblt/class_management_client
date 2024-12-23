import { Container, ListGroup } from "react-bootstrap";
import Navbarx from "../components/Navbar";
import { Helmet } from 'react-helmet';

const infos = [

    { x: "Ünvan", y: "Öğrenci" },
    { x: "Ad Soyad", y: "Ali Duru" },
    { x: "Öğrenci No", y: "1211202010" },
    { x: "Kurumsal E-posta", y: "aliduru@trakya.edu.tr" },
    { x: "Fakülte", y: "Mühendislik Fakültesi" },
    { x: "Bölüm", y: "Makine Mühendisliği" },
    { x: "Sınıf", y: "3" },
];

const ProfilePage = () => {
    return (
        <Container >

            <Helmet>
                <title>Profil Sayfası</title>
            </Helmet>

            <Navbarx />
            <Container style={{ marginTop: "150px" }} className="w-50 bg-light rounded-4 p-4 shadow" >
                <h2>Profil bilgileriniz</h2>
                <ListGroup >
                    {infos.map((info, index) => (
                        <ListGroup.Item key={index}>
                            <strong>{info.x}:</strong> {info.y}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>

        </Container>
    );
};

export default ProfilePage;
