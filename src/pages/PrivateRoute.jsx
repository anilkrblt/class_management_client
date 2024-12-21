import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { userType } = useContext(UserContext);

  // Kullanıcı tipi belirlenmemişse (giriş yapılmamışsa), giriş sayfasına yönlendir
  if (!userType) {
    return <Navigate to="/giris" />;
  }

  // Kullanıcı rolü yetkili değilse, ana sayfaya yönlendir
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/anasayfa" />;
  }

  return children;
};

export default PrivateRoute;
