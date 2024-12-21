import { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

const HomePage = () => {
  const { userType } = useContext(UserContext);

  if (userType === 'student') {
    return <Navigate to="/anasayfa/student" />;
  }
  if (userType === 'admin') {
    return <Navigate to="/anasayfa/admin" />;
  }
  if (userType === 'instructor') {
    return <Navigate to="/anasayfa/instructor" />;
  }

  return <Navigate to="/" />;
};
export default HomePage