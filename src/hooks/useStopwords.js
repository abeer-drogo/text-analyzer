// src/hooks/useStopwords.js
import { useEffect, useState } from "react";
import { loadFromLocal, saveToLocal } from "../utils/localStorageUtils";

export const useStopwords = (language) => {
  const [stopwords, setStopwords] = useState([]);

  // Load stopwords from localStorage or fallback to public
  useEffect(() => {
    const local = loadFromLocal(language);
    if (local && Array.isArray(local)) {
      setStopwords(local);
    } else {
      fetch(`/stopwords/${language}.json`)
        .then((res) => res.json())
        .then((data) => {
          setStopwords(data);
          saveToLocal(language, data);
        });
    }
  }, [language]);

  const addStopword = (word) => {
    if (!stopwords.includes(word)) {
      const updated = [...stopwords, word];
      setStopwords(updated);
      saveToLocal(language, updated);
    }
  };

  const bulkAdd = (words) => {
    const newWords = words.filter((w) => !stopwords.includes(w));
    const updated = [...stopwords, ...newWords];
    setStopwords(updated);
    saveToLocal(language, updated);
  };

  const removeStopword = (word) => {
    const updated = stopwords.filter((w) => w !== word);
    setStopwords(updated);
    saveToLocal(language, updated);
  };

  const resetStopwords = () => {
    localStorage.removeItem(`stopwords-${language}`);
    fetch(`/stopwords/${language}.json`)
      .then((res) => res.json())
      .then((data) => {
        setStopwords(data);
        saveToLocal(language, data);
      });
  };

  return {
    stopwords,
    addStopword,
    bulkAdd,
    removeStopword,
    setStopwords,
    resetStopwords,
  };
};
