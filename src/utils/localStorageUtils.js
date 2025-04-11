// src/utils/localStorageUtils.js

const getKey = (language) => `stopwords-${language}`;

export const saveToLocal = (language, stopwords) => {
  try {
    localStorage.setItem(getKey(language), JSON.stringify(stopwords));
  } catch (err) {
    console.error("Error saving stopwords to localStorage", err);
  }
};

export const loadFromLocal = (language) => {
  try {
    const stored = localStorage.getItem(getKey(language));
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Error loading stopwords from localStorage", err);
    return null;
  }
};
