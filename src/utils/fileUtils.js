// src/utils/fileUtils.js

// Parse text content to word list
export const parseStopwordsFromFile = (text) => {
    return text
      .split(/[\n,]+/)         // split by newlines or commas
      .map((word) => word.trim().toLowerCase())
      .filter(Boolean);
  };
  
  // Export stopwords to file
  export const exportStopwordsToFile = (language, stopwords, format = "txt") => {
    const content = stopwords.join(format === "csv" ? "," : "\n");
    const blob = new Blob([content], { type: "text/plain" });
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${language}-stopwords.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  