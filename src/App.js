import React from 'react';
import ClassReservationRequests from './components/ClassReservationRequests';
import Classes from './components/Classes';
import StudentHomePage from './pages/StudentHomepage';
import { UserProvider } from './components/UserContext';
import InstructorHomePage from './pages/InstructorHomePage';
import ClassroomManagerPage from './pages/ClassroomManagerPage';
import StudentSchedule from './components/StudentSchedule';
import StudentSchedulePage from './pages/StudentSchedulePage';
import Deneme from './components/deneme';
import LessonPlaningPage from './pages/LessonPlaningPage';
import ComplaintsPage from './pages/ComplaintsPage';
import AdminHomePage from './pages/AdminHomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Routes'ı ekleyin
import ClassesPage from './pages/ClassesPage';
import LessonManagerPage from './pages/LessonManegerPage';
import InstructorSchedule from './components/InstructorSchedule';
import InstructorSchedulePage from './pages/InstructorSchedulePage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (

    <BrowserRouter>
      <Routes> {/* Router yerine Routes kullanılır */}
        <Route path='/' element={<LessonPlaningPage />} />
        <Route path='/anasayfa' element={<StudentHomePage />} />
        <Route path='/sınıflar' element={<ClassesPage />} />
        <Route path='/dersler' element={<LessonManagerPage />} />
        <Route path='/sınıfyonetimi' element={<ClassroomManagerPage />} />
        <Route path='/şikayetler' element={<ComplaintsPage />} />
        <Route path='/dersprogrami' element={<InstructorSchedulePage />} />
        
      </Routes>
    </BrowserRouter>

  );
};

export default App;
