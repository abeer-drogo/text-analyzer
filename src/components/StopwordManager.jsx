// StopwordManager.jsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import saveAs from "file-saver";
import { X, Search, Upload } from "lucide-react";
import UploadStopwordsModal from "@/components/UploadStopwordsModal";

export default function StopwordManager({ language, stopwordLibrary, setStopwordLibrary }) {
  const [showStopwords, setShowStopwords] = useState(false);
  const [localStopwords, setLocalStopwords] = useState([]);
  const [selectedStopwords, setSelectedStopwords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkInput, setBulkInput] = useState("");

  const currentStopwords = stopwordLibrary[language] || [];

  useEffect(() => {
    setLocalStopwords([...currentStopwords]);
  }, [language]);

  const updateStopwords = () => {
    const newWords = bulkInput
      .split(",")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word && !localStopwords.includes(word));
    setLocalStopwords((prev) => [...prev, ...newWords]);
    setBulkInput("");
  };

  const deleteStopwordChip = (word) => {
    setLocalStopwords((prev) => prev.filter((w) => w !== word));
  };

  const exportStopwords = () => {
    const blob = new Blob([stopwordLibrary[language].join(", ")], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, `${language}-stopwords.txt`);
  };

  const importStopwords = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const newWords = event.target.result
        .split(",")
        .map((w) => w.trim().toLowerCase())
        .filter((w) => w && !localStopwords.includes(w));
      setLocalStopwords((prev) => [...prev, ...newWords]);
    };
    reader.readAsText(file);
  };

  const saveStopwords = () => {
    setStopwordLibrary((prev) => ({
      ...prev,
      [language]: [...localStopwords]
    }));
    setShowStopwords(false);
  };

  const cancelStopwordEdit = () => {
    setLocalStopwords([...stopwordLibrary[language]]);
    setShowStopwords(false);
  };

  const filteredStopwords = localStopwords.filter((word) =>
    word.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={() => setShowStopwords(!showStopwords)}>
        {showStopwords ? "Hide Stopwords" : "Show All Stopwords"}
      </Button>

      {showStopwords && (
        <div className="relative mb-8">
        <Input
          placeholder="Search Stopwords…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          <Search size={16} />
        </span>
        <div className="flex flex-wrap gap-2 mt-2 mb-4 text-sm">
          {filteredStopwords.map((word, idx) => (
            <div
              key={idx}
              className="flex items-center px-2 py-1 bg-gray-200 rounded-full"
            >
              <span>{word}</span>
              <button
                onClick={() => deleteStopwordChip(word)}
                className="ml-1 text-gray-600 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <label className="block mb-1">Add Stopwords (comma separated):</label>
          <Input
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="Add stopwords (comma separated)"
            className="mb-2"
          />
          <Button onClick={updateStopwords} className="bg-green-600 text-white mb-4">
            + Add
          </Button>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Button onClick={saveStopwords} className="bg-blue-600 text-white">Save</Button>
            <Button variant="outline" onClick={cancelStopwordEdit}>Cancel</Button>
            <Button variant="outline" onClick={exportStopwords}>Export</Button>
            <UploadStopwordsModal onUpload={importStopwords} />
          </div>
        </div>
      )}
    </div>
  );
}
