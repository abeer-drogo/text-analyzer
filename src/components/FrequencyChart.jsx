// src/components/FrequencyChart.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FrequencyChart = () => {
  const { text, language } = useContext(AppContext);
  const [stopwords, setStopwords] = useState([]);
  const [frequencies, setFrequencies] = useState([]);

  useEffect(() => {
    const loadStopwords = async () => {
      try {
        const res = await fetch(`/stopwords/${language}.json`);
        const data = await res.json();
        setStopwords(data);
      } catch {
        setStopwords([]);
      }
    };
    loadStopwords();
  }, [language]);

  useEffect(() => {
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    const freqMap = {};

    stopwords.forEach((stopword) => {
      const count = words.filter((w) => w === stopword).length;
      if (count > 0) {
        freqMap[stopword] = count;
      }
    });

    const chartData = Object.entries(freqMap)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // top 10

    setFrequencies(chartData);
  }, [text, stopwords]);

  if (frequencies.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="font-semibold text-lg mb-2">Top Stopword Frequencies</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={frequencies}>
          <XAxis dataKey="word" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyChart;
