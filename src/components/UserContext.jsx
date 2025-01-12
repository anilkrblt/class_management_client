import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => localStorage.getItem("userType") || null);
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    }
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userType, userId]);

  return (
    <UserContext.Provider value={{ userType, setUserType, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
