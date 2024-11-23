import React from 'react';
import ClassReservationRequests from './components/ClassReservationRequests';
import Classes from './components/Classes';
import StudentHomePage from './pages/StudentHomepage';
import { UserProvider } from './components/UserContext';
import InstructorHomePage from './pages/InstructorHomePage';



const App = () => {
  return (
    <UserProvider>
      
      <InstructorHomePage/>
    </UserProvider>
   

   
  );
};

export default App;


