import React, { useEffect, useState } from "react";
import TextAnalyzer from "./TextAnalyzer";

const footerMessages = [
  "Built during coffee breaks ☕ and existential crises",
  "Coded between breakdowns and breakthroughs 💻",
  "Fueled by anxiety and leftover pizza 🍕🧠",
  "When therapy was too expensive, I made this app",
  "Crafted in the void between procrastination and panic",
  "Sleep is for the weak, bugs are forever 🐛",
  "One crash away from enlightenment 🔥🧘",
  "What happens when coffee meets crisis ☕⚠️",
];

function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % footerMessages.length);
    }, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-6 min-h-screen bg-white flex flex-col items-center justify-between">
      <TextAnalyzer />

      <footer className="w-full border-t pt-4 mt-10 text-center text-sm bg-clip-text text-transparent animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] transition-opacity duration-500 ease-in-out">
        {footerMessages[index]}
      </footer>
    </main>
  );
}

export default App;
