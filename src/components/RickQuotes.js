import React, { useState, useEffect } from "react";
import { RefreshCw, Compass } from "lucide-react";
import { soundFx } from "../utils/audio";

const quotesData = {
  es: [
    { quote: "¡Wubba Lubba Dub Dub!", author: "Rick Sanchez (C-137)", context: "Grito de guerra interdimensional" },
    { quote: "A veces la ciencia es más arte que ciencia, Morty. Mucha gente no lo entiende.", author: "Rick Sanchez", context: "Sabiduría multiversal" },
    { quote: "Nadie existe a propósito. Nadie pertenece a ningún lugar. Todos van a morir. Ven a ver televisión.", author: "Morty Smith", context: "Filosofía existencial" },
    { quote: "¡Me convertí en un pepinillo, Morty! ¡Soy Rick Pepinillo!", author: "Pickle Rick", context: "Solución para evitar terapia familiar" },
    { quote: "¡La existencia es dolor para un Meeseeks, Jerry! Y haremos lo que sea para morir.", author: "Mr. Meeseeks", context: "Instrucciones de la Caja Meeseeks" },
    { quote: "¡Es hora de ponerse schwifty aquí!", author: "Rick & Morty", context: "Salvando la Tierra en el concurso musical galáctico" },
    { quote: "La escuela no es un lugar para gente inteligente, Morty.", author: "Rick Sanchez", context: "Consejo educativo" }
  ],
  en: [
    { quote: "Wubba Lubba Dub Dub!", author: "Rick Sanchez (C-137)", context: "Interdimensional battle cry" },
    { quote: "Sometimes science is more art than science, Morty. A lot of people don't get that.", author: "Rick Sanchez", context: "Multiverse wisdom" },
    { quote: "Nobody exists on purpose. Nobody belongs anywhere. Everybody's gonna die. Come watch TV.", author: "Morty Smith", context: "Existential philosophy" },
    { quote: "I turned myself into a pickle, Morty! I'm Pickle Rick!", author: "Pickle Rick", context: "Evading family therapy" },
    { quote: "Existence is pain to a Meeseeks, Jerry! And we will do anything to die.", author: "Mr. Meeseeks", context: "Meeseeks Box rule" },
    { quote: "It's time to get schwifty in here!", author: "Rick & Morty", context: "Saving Earth in the Galactic Music Jam" },
    { quote: "School is not a place for smart people, Morty.", author: "Rick Sanchez", context: "Educational advice" }
  ]
};

const RickQuotes = ({ lang = "es", t, onSelectDimension }) => {
  const quotes = quotesData[lang] || quotesData.es;
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Auto cycle quote every 12 seconds
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleNextQuote = () => {
    soundFx.playClick();
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const currentQuote = quotes[quoteIndex] || quotes[0];

  const dimensions = [
    { id: "rick", label: "Rick Sanchez", query: { name: "Rick" } },
    { id: "morty", label: "Morty Smith", query: { name: "Morty" } },
    { id: "summer", label: "Summer", query: { name: "Summer" } },
    { id: "beth", label: "Beth", query: { name: "Beth" } },
    { id: "jerry", label: "Jerry", query: { name: "Jerry" } },
    { id: "pickle", label: "Pickle Rick", query: { name: "Pickle" } },
    { id: "cronenberg", label: "Cronenberg", query: { species: "Cronenberg" } },
    { id: "alien", label: lang === "es" ? "Alienígenas" : "Aliens", query: { species: "Alien" } },
  ];

  return (
    <div className="rm-rick-universe-panel mb-4">
      {/* Quote Banner */}
      <div className="rm-quote-card">
        <div className="d-flex align-items-start gap-3">
          <div className="rm-quote-avatar" aria-hidden="true">
            🧪
          </div>
          <div className="flex-grow-1">
            <p className="rm-quote-text mb-1">
              "{currentQuote.quote}"
            </p>
            <div className="rm-quote-author">
              <strong>{currentQuote.author}</strong> · <span className="rm-quote-context">{currentQuote.context}</span>
            </div>
          </div>
          <button
            type="button"
            className="rm-nav-btn py-1 px-2 ms-auto"
            onClick={handleNextQuote}
            title={lang === "es" ? "Siguiente cita de Rick" : "Next Rick quote"}
          >
            <RefreshCw size={13} />
            <span className="d-none d-md-inline" style={{ fontSize: "0.78rem" }}>
              {lang === "es" ? "Otra Cita" : "New Quote"}
            </span>
          </button>
        </div>
      </div>

      {/* Multiverse Quick Jumps */}
      <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-2 border-top border-opacity-10 border-secondary">
        <div className="d-flex align-items-center gap-1 rm-dimension-label">
          <Compass size={14} className="text-success" />
          <span>{t.dimensionHopper || "Sectores del Multiverso"}:</span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {dimensions.map((dim) => (
            <button
              key={dim.id}
              type="button"
              className="rm-dim-chip"
              onClick={() => {
                soundFx.playClick();
                if (onSelectDimension) onSelectDimension(dim.query);
              }}
              title={`${lang === "es" ? "Filtrar por" : "Filter by"} ${dim.label}`}
            >
              🛸 {dim.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RickQuotes;
