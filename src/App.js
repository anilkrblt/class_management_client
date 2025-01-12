import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentHomePage from "./pages/StudentHomepage";
import ClassesPage from "./pages/ClassesPage";
import LessonManagerPage from "./pages/LessonManegerPage";
import ClassroomManagerPage from "./pages/ClassroomManagerPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import InstructorSchedulePage from "./pages/InstructorSchedulePage";
import AdminHomePage from "./pages/AdminHomePage";
import InstructorHomePage from "./pages/InstructorHomePage";
import LessonPlaningPage from "./pages/LessonPlaningPage";
import { UserContext, UserProvider } from "./components/UserContext";
import PrivateRoute from "./pages/PrivateRoute";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/404Page";
import CreateComplaintPage from "./pages/CreateComplaintPage";
import StudentSchedulePage from "./pages/StudentSchedulePage";
import ProfilePage from "./pages/ProfilePage";
import ClubEvents from "./components/ClubEvents";
import ClubEventsOld from "./components/ClubEventsOld";
import ClubEventsPage from "./pages/ClubEventsPage";
import ClassReservationRequests from "./components/ClassReservationRequests";
import ClassReservationRequestsPage from "./pages/ClassReservationRequestsPage";
import LessonPlaning from "./components/LessonPlaning";
import StudentExams from "./components/StudentExams";
import LoginScreen from "./pages/LoginPage2";
import { getAllRooms } from "./utils/RoomApiService";
import InstructorLessons from "./components/InstructorLessons";

import { getAllLectures, updateLecture } from "./utils/LectureApiService";
import { getAllComplaints } from "./utils/ComplaintApiService";
import InstructorLessonsPage from "./pages/InstructorLessonsPage";
import ComplaintsStudentPage from "./pages/ComplaintsStudentPage";
import CreateExam from "./components/CreateExam";
import CreateExamPage from "./pages/CreateExamPage";
import StudentSchedule from "./components/StudentSchedule";

const App = () => {
  const { userType, setUserType } = useContext(UserContext);



  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userType === null ? <Navigate to="/giris" replace /> : <HomePage />
          }
        />
        <Route
          path="/giris"
          element={
            userType !== null ? <Navigate to="/anasayfa" /> : <LoginPage />
          }
        />
        <Route path="/anasayfa" element={<HomePage />} />
        <Route
          path="/anasayfa/student"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/anasayfa/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/anasayfa/instructor"
          element={
            <PrivateRoute allowedRoles={["instructor"]}>
              <InstructorHomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/sınıflar"
          element={
            <PrivateRoute allowedRoles={["admin", "student", "instructor"]}>
              <ClassesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dersler"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <LessonManagerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/sınıfyonetimi"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ClassroomManagerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/şikayetler"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ComplaintsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/şikayetoluştur"
          element={
            <PrivateRoute allowedRoles={["student", "instructor"]}>
              <CreateComplaintPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/şikayetleriniz"
          element={
            <PrivateRoute allowedRoles={["student", "instructor"]}>
              <ComplaintsStudentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dersprogrami"
          element={
            <PrivateRoute allowedRoles={["instructor", "admin"]}>
              <InstructorSchedulePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dersprogramı"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentSchedulePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<LoginScreen />} />

        <Route
          path="/profil"
          element={
            <PrivateRoute allowedRoles={["student", "admin", "instructor"]}>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/kulüpler"
          element={
            <PrivateRoute allowedRoles={["student", "admin", "instructor"]}>
              <ClubEventsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/kulüpler-rezervasyon"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ClassReservationRequestsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/sınavolustur"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <CreateExamPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
