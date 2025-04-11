// src/components/LanguageSelector.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(AppContext);
  const languages = ["english", "hindi", "malayalam", "tamil"];

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="language" className="font-semibold">
        Select Language:
      </label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 border rounded-md shadow-sm bg-white"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
