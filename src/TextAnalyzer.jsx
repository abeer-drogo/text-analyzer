import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import saveAs from "file-saver";
import StopwordManager from "@/components/StopwordManager";
import { Loader2 } from "lucide-react";

const defaultStopwords = {
  english: ["the", "is", "in", "at"],
  hindi: ["है", "में", "और"],
  malayalam: ["ഇത്", "ആണ്", "ഒരു"],
  tamil: ["இது", "ஒரு", "ஆகும்"],
  kannada: ["ಇದು", "ಮತ್ತು", "ಹಾಗು"],
  telugu: ["ఇది", "ఒక", "మరియు"],
  marathi: ["हा", "एक", "आणि"],
  gujarati: ["આ", "એક", "અને"]
};

export default function TextAnalyzer() {
  const [language, setLanguage] = useState("english");
  const [stopwordLibrary, setStopwordLibrary] = useState(defaultStopwords);
  const [text, setText] = useState("");
  const [results, setResults] = useState({});
  const [highlightedText, setHighlightedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentStopwords = stopwordLibrary[language] || [];

  useEffect(() => {
    const saved = localStorage.getItem("stopwordLibrary");
    if (saved) setStopwordLibrary(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("stopwordLibrary", JSON.stringify(stopwordLibrary));
  }, [stopwordLibrary]);

  const analyzeText = () => {
    setIsLoading(true);
  
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const words = lowerText
        .split(/\s+/)
        .map((w) => w.replace(/[^\p{L}\p{M}]/gu, "").trim())
        .filter(Boolean);
  
      const wordCounts = {};
      currentStopwords.forEach((stopword) => {
        const count = words.filter((word) => word === stopword).length;
        if (count > 0) wordCounts[stopword] = count;
      });
  
      setResults(wordCounts);
      setHighlightedText(highlightText(wordCounts));
      setIsLoading(false);
    }, 500); // Optional: simulate delay
  };

  const highlightText = (wordCounts) => {
    const escapedWords = Object.keys(wordCounts).map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const pattern = new RegExp(`(${escapedWords.join("|")})`, "gu");

    return text.replace(pattern, (match) => {
      return `<span style="background-color: rgba(255,255,0,0.6); padding: 2px; border-radius: 4px;">${match}</span>`;
    });
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setResults({});
    setHighlightedText("");
  };

  return (
    <div className="p-6 space-y-4">
      <Tabs value={language} onValueChange={handleLanguageChange}>
        <div className="sticky top-0 z-10 bg-white py-2">
        <TabsList className="flex justify-center gap-2 rounded-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 p-2 shadow-md sticky top-0 z-20 backdrop-blur-sm mx-auto w-fit">
           {["english", "hindi", "malayalam", "tamil", "kannada", "telugu", "marathi", "gujarati"].map((lang) => (
           <TabsTrigger
             key={lang}
             value={lang}
              className="rounded-full px-4 py-1 text-sm font-medium transition data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100"
            >
             {lang.charAt(0).toUpperCase() + lang.slice(1)}
           </TabsTrigger>
             ))}
        </TabsList>
        </div>
      </Tabs>

      <Card>
        <CardContent className="space-y-2 p-4">
          <StopwordManager
            language={language}
            stopwordLibrary={stopwordLibrary}
            setStopwordLibrary={setStopwordLibrary}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <label>Enter your text:</label>
          <Textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.metaKey && e.key === "Enter") analyzeText();
            }}
            placeholder="Paste or type your text here…"
            className="w-full text-base p-4 border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center mt-4">
          <Button
            onClick={analyzeText}
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Analyze Text"
            )}
          </Button>

            <Button
              variant="outline"
              className="text-black border-gray-300 hover:bg-gray-100"
              onClick={() => setText("")}
            >
              Clear Text
            </Button>
          </div>
        </CardContent>
      </Card>

      {Object.keys(results).length > 0 && (
        <Card>
          <CardContent className="space-y-2 p-4">
            <div className="font-semibold">Stopword Occurrences:</div>
            <ul className="list-disc list-inside">
              {Object.entries(results).map(([word, count]) => (
                <li key={word}>{word}: {count} time(s)</li>
              ))}
            </ul>
            <div
              className="mt-4 p-2 border rounded bg-gray-100 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
