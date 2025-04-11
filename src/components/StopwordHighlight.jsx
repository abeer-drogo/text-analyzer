// src/components/StopwordHighlight.jsx
import React, { useEffect, useState } from "react";

const getWordFrequency = (text) => {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const freq = {};
  words.forEach((word) => {
    freq[word] = (freq[word] || 0) + 1;
  });
  return freq;
};

const StopwordHighlight = ({ text, stopwords }) => {
  const [wordFreq, setWordFreq] = useState({});

  useEffect(() => {
    setWordFreq(getWordFrequency(text));
  }, [text]);

  const getHighlightStyle = (word) => {
    const frequency = wordFreq[word.toLowerCase()] || 1;
    const intensity = Math.min(0.1 + frequency * 0.05, 0.8);
    return {
      backgroundColor: `rgba(59, 130, 246, ${intensity})`, // blue-ish background
      color: "#fff",
      padding: "0 4px",
      borderRadius: "4px",
      margin: "0 2px"
    };
  };

  const splitWords = text.split(/(\s+|\b)/g).map((part, index) => {
    const lower = part.toLowerCase();
    if (stopwords.includes(lower)) {
      return (
        <span key={index} style={getHighlightStyle(lower)}>
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });

  return <div className="mt-4 p-3 bg-gray-50 rounded shadow-inner">{splitWords}</div>;
};

export default StopwordHighlight;
