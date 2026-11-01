
import { useState } from "react";
import quotes from "./Quotes.jsx";
import "./App.css";

const colors = [
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#9b59b6",
  "#f39c12",
  "#1abc9c",
  "#34495e"
];

function App() {
  const [randomQuote, setRandomQuote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );

  const [color, setColor] = useState("#3498db");

  const handleNewQuote = () => {
    // Générer une citation différente
    if (quotes.length > 1) {
      let newQuote;

      do {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        newQuote = quotes[randomIndex];
      } while (newQuote.quote === randomQuote.quote);

      setRandomQuote(newQuote);
    }

    // Générer une couleur différente
    let randomColor;

    do {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (randomColor === color);

    setColor(randomColor);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: color }}
    >
      <div className="quote-box">
        <h1 style={{ color: color }}>
          {randomQuote.quote}
        </h1>

        <p>{randomQuote.author || "Unknown"}</p>

        <button
          onClick={handleNewQuote}
          style={{ backgroundColor: color }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
