// src/components/StopwordPanel.jsx
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const StopwordPanel = () => {
  const { language } = useContext(AppContext);
  const [stopwords, setStopwords] = useState([]);
  const [search, setSearch] = useState("");
  const [newWords, setNewWords] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadStopwords = async () => {
      try {
        const res = await fetch(`/stopwords/${language}.json`);
        const data = await res.json();
        setStopwords(data);
      } catch (err) {
        console.error("Error loading stopwords:", err);
        setStopwords([]);
      }
    };
    loadStopwords();
  }, [language]);

  const addStopwords = () => {
    const newList = newWords
      .split(",")
      .map(w => w.trim())
      .filter(w => w && !stopwords.includes(w));
    setStopwords([...stopwords, ...newList]);
    setNewWords("");
  };

  const removeStopword = (word) => {
    setStopwords(stopwords.filter(w => w !== word));
  };

  const filtered = stopwords.filter(w => w.includes(search));

  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Stopwords for {language.toUpperCase()}</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-500 hover:underline"
        >
          {showAll ? "Hide All" : "Show All"}
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search stopwords..."
        className="w-full p-2 border rounded mb-3"
      />

      {showAll && (
        <ul className="max-h-60 overflow-y-auto border p-2 rounded bg-gray-50">
          {filtered.map((word, idx) => (
            <StopwordEditor
            key={idx}
            word={word}
            onUpdate={(newWord) => {
              const updated = [...stopwords];
              updated[idx] = newWord;
              setStopwords(updated);
            }}
            onRemove={() => removeStopword(word)}
          />          
          ))}
        </ul>
      )}

      <div className="mt-3">
        <input
          type="text"
          placeholder="Add new stopwords (comma-separated)"
          value={newWords}
          onChange={(e) => setNewWords(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={addStopwords}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Stopwords
        </button>
      </div>
    </div>
  );
};

export default StopwordPanel;
