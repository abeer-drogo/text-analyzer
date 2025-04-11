// src/App.jsx
import React from "react";
import AnalyzerPage from "./pages/AnalyzerPage";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <AnalyzerPage />
      </div>
    </AppProvider>
  );
};

export default App;
