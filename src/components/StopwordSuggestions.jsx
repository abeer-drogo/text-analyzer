// src/components/StopwordSuggestions.jsx
import React, { useEffect, useState } from "react";

const StopwordSuggestions = ({ text, stopwords, onAdd }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const wordCounts = {};
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);

    words.forEach((word) => {
      if (!stopwords.includes(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    const sorted = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) // top 10
      .map(([word]) => word);

    setSuggestions(sorted);
  }, [text, stopwords]);

  if (!text.trim()) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Suggested Stopwords</h2>
      {suggestions.length === 0 ? (
        <p className="text-sm text-gray-500">No suggestions at this time.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((word) => (
            <button
              key={word}
              onClick={() => onAdd(word)}
              className="bg-yellow-300 hover:bg-yellow-400 text-sm px-2 py-1 rounded"
              title="Click to add to stopwords"
            >
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StopwordSuggestions;
