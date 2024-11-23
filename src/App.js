import React from 'react';
import ClassReservationRequests from './components/ClassReservationRequests';
import Classes from './components/Classes';
import StudentHomePage from './pages/StudentHomepage';
import { UserProvider } from './components/UserContext';
import InstructorHomePage from './pages/InstructorHomePage';



const App = () => {
  return (
    <UserProvider>
      
      <StudentHomePage/>
    </UserProvider>
   

   
  );
};

export default App;


