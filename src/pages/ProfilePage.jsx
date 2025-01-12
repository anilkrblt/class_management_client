import { Container, ListGroup } from "react-bootstrap";
import Navbarx from "../components/Navbar";
import { Helmet } from 'react-helmet';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { getInstructorById, getStudentById } from "../utils/ProfileApiService";

const ProfilePage = () => {
    const { userType , userId} = useContext(UserContext); 
    const [userInfo, setUserInfo] = useState(null); 
    const [user, setUser] = useState([]);


    useEffect(() => {
        const fetchUserData = async () => {
            let user;
            if (userType === "instructor") {
                user = await getInstructorById(userId);
            } else if (userType === "student") {
                user = await getStudentById(userId);
            }
            setUserInfo(user); 
        };

        fetchUserData();
    }, [userType]); 

    useEffect(() => {
        if (userInfo) {
            let userDetails = [];
            
            if (userType === "instructor") {
                userDetails = [
                    { x: "Ünvan", y: userInfo.title },
                    { x: "Ad Soyad", y: userInfo.instructorName },
                    { x: "Personel No", y: userInfo.instructorId },
                    { x: "Kurumsal E-posta", y: userInfo.email },
                    { x: "Fakülte", y: "Mühendislik Fakültesi" },
                    { x: "Bölüm", y: userInfo.departmentName },
                ];
            } else if (userType === "student") {
                userDetails = [
                    { x: "Ünvan", y: "Öğrenci" },
                    { x: "Ad Soyad", y: userInfo.fullName },
                    { x: "Öğrenci No", y: userInfo.studentId },
                    { x: "Kurumsal E-posta", y: userInfo.email },
                    { x: "Fakülte", y: "Mühendislik Fakültesi" },
                    { x: "Bölüm", y: userInfo.departmentName },
                    { x: "Sınıf", y: userInfo.grade },
                ];
            }

            setUser(userDetails); 
        }
    }, [userInfo, userType]); 

    return (
        <Container>
            <Helmet>
                <title>Profil Sayfası</title>
            </Helmet>

            <Navbarx />
            <Container style={{ marginTop: "150px" }} className="w-50 bg-light rounded-4 p-4 shadow">
                <h2>Profil Bilgileriniz</h2>
                <ListGroup>
                    {user.map((info, index) => (
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
