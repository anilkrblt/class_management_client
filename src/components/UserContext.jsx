import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || null;
  });

  useEffect(() => {
    if (userType !== null) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
