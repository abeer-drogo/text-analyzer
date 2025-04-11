// src/context/AppContext.jsx
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");
  const [text, setText] = useState("");

  return (
    <AppContext.Provider value={{ language, setLanguage, text, setText }}>
      {children}
    </AppContext.Provider>
  );
};
