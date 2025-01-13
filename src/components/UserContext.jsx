import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => localStorage.getItem("userType") || null);
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || null);
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      try {
        return JSON.parse(storedNotifications);
      } catch (e) {
        console.error("Hata: notifications verisi JSON formatında değil", e);
        return [];  // Hata durumunda boş bir dizi döndür
      }
    }
    return []; // Eğer önceden kaydedilmiş bir veri yoksa, başlangıçta boş bir dizi
  });
  


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
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [userType, userId, userName, notifications]);

  return (
    <UserContext.Provider value={{ userType, setUserType, userId, setUserId, userName, setUserName, notifications, setNotifications }}>
      {children}
    </UserContext.Provider>
  );
};
