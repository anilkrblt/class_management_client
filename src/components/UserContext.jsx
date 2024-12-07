import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || "student");

  useEffect(() => {
    localStorage.setItem('userType', userType);
  }, [userType]);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
