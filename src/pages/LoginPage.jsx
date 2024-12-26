import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { Image } from "react-bootstrap";

const LoginPage = () => {
  const { setUserType } = useContext(UserContext);
  const [selectedUserType, setSelectedUserType] = useState("student");
  const navigate = useNavigate();

  // Bileşen ilk yüklendiğinde userType'ı null yap
  useEffect(() => {
    setUserType(null);
  }, [setUserType]);

  const handleLogin = () => {
    setUserType(selectedUserType);
    navigate("/anasayfa/");
  };

  return (
    <div>
      <img src="./circle-a.svg" color="red"/>
      <svg src="./circle-a.svg" fill="red" />
      <Image src="https://cdn.auth0.com/avatars/nb.png" width={50} color="red" roundedCircle/> 
      <h2>Login Page</h2>
      <select onChange={(e) => setSelectedUserType(e.target.value)} value={selectedUserType}>
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
