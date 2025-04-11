// src/components/TextInputArea.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TextInputArea = () => {
  const { text, setText } = useContext(AppContext);

  return (
    <div>
      <label htmlFor="text-input" className="block font-semibold mb-2">
        Enter Text for Analysis:
      </label>
      <textarea
        id="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Type or paste your text here..."
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextInputArea;
