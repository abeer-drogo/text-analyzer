// src/components/ImportExportPanel.jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const ImportExportPanel = () => {
  const { language } = useContext(AppContext);
  const [stopwords, setStopwords] = useState([]);

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const imported = text
        .split(/[\n,]+/)
        .map((w) => w.trim())
        .filter(Boolean);
      setStopwords(imported);
      localStorage.setItem(`stopwords_${language}`, JSON.stringify(imported));
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const dataStr = localStorage.getItem(`stopwords_${language}`);
    const blob = new Blob([dataStr || "[]"], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${language}_stopwords.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="font-semibold text-lg mb-3">Import/Export Stopwords</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="file"
          accept=".txt,.csv"
          onChange={handleImport}
          className="border p-2 rounded"
        />
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export Stopwords
        </button>
      </div>
    </div>
  );
};

export default ImportExportPanel;
