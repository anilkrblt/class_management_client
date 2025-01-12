import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => localStorage.getItem("userType") || null);
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || null);
  const [notifications, setNotifications] = useState(() => localStorage.getItem("notifications") || null);


  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    }
    if (userId) {
      localStorage.setItem("userId", userId);
    }
    if (userName) {
      localStorage.setItem("userName", userName);
    }
    if (notifications) {
      localStorage.setItem("notifications", notifications);
    }
  }, [userType, userId, userName, notifications]);

  return (
    <UserContext.Provider value={{ userType, setUserType, userId, setUserId, userName, setUserName, notifications, setNotifications }}>
      {children}
    </UserContext.Provider>
  );
};
