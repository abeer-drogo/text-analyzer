// src/utils/stopwordUtils.js

// Normalize input: lowercase and split by non-word boundaries
export const getWordsFromText = (text) => {
    return text.toLowerCase().split(/\W+/).filter(Boolean);
  };
  
  // Extract stopwords from text based on current list
  export const extractStopwords = (text, stopwords) => {
    const words = getWordsFromText(text);
    return words.filter((word) => stopwords.includes(word));
  };
  
  // Get frequency count of stopwords found in the text
  export const countStopwordFrequency = (text, stopwords) => {
    const words = getWordsFromText(text);
    const freq = {};
  
    words.forEach((word) => {
      if (stopwords.includes(word)) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });
  
    return freq;
  };
  
  // Sort frequency map into an array of { word, count }
  export const sortFrequency = (freqMap) => {
    return Object.entries(freqMap)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);
  };
  