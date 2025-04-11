// src/pages/AnalyzerPage.jsx
import React from "react";
import LanguageSelector from "../components/LanguageSelector";
import TextInput from "../components/TextInput";
import StopwordResults from "../components/StopwordResults";
import StopwordPanel from "../components/StopwordPanel";
import FrequencyChart from "../components/FrequencyChart";
import ImportExportPanel from "../components/ImportExportPanel";

const AnalyzerPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Multilingual Stopword Analyzer</h1>

      <LanguageSelector />
      <TextInput />
      <StopwordResults />
      <FrequencyChart />

      <div className="grid md:grid-cols-2 gap-6">
        <StopwordPanel />
        <ImportExportPanel />
      </div>
    </div>
  );
};

export default AnalyzerPage;
