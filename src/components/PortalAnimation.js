import React, { useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import { soundFx } from "../utils/audio";

const PortalAnimation = ({ t, onWarp }) => {
  const [isWarping, setIsWarping] = useState(false);

  const handlePortalClick = () => {
    soundFx.playPortalSound();
    setIsWarping(true);
    if (onWarp) onWarp();
    setTimeout(() => setIsWarping(false), 900);
  };

  return (
    <div className="rm-portal-hero-container">
      {/* Portal Container */}
      <div
        className={`rm-portal-wrapper ${isWarping ? "rm-portal-active-warp" : ""}`}
        onClick={handlePortalClick}
        role="button"
        tabIndex={0}
        aria-label="Activate Portal Gun"
        title={t.portalGunHint || "¡Haz clic en el portal para viajar entre dimensiones!"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePortalClick();
          }
        }}
      >
        {/* Swirling Portal SVG Graphics */}
        <svg
          viewBox="0 0 200 200"
          className="rm-portal-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d9f99d" stopOpacity="1" />
              <stop offset="25%" stopColor="#84cc16" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#042f2e" stopOpacity="0" />
            </radialGradient>

            <filter id="portalTurbulence" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Outer glow ring */}
          <circle cx="100" cy="100" r="92" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 8" className="rm-portal-ring-outer" />

          {/* Middle electric ring */}
          <circle cx="100" cy="100" r="78" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeDasharray="14 10" className="rm-portal-ring-mid" />

          {/* Main glowing portal body */}
          <circle cx="100" cy="100" r="70" fill="url(#portalGlow)" filter="url(#portalTurbulence)" className="rm-portal-core" />

          {/* Inner swirl rays */}
          <circle cx="100" cy="100" r="50" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="8 6" className="rm-portal-ring-inner" />

          {/* Central vortex */}
          <circle cx="100" cy="100" r="22" fill="#d9f99d" opacity="0.95" className="rm-portal-eye" />
        </svg>

        {/* Portal Gun HUD Badge */}
        <div className="rm-portal-hud-badge">
          <Zap size={13} className="text-warning" />
          <span>PORTAL GUN C-137</span>
        </div>
      </div>

      {/* Interactive Trigger Button */}
      <button
        type="button"
        className="rm-btn-portal-gun mt-3"
        onClick={handlePortalClick}
        title={t.randomCharacterDesc}
      >
        <Sparkles size={16} />
        <span>{t.firePortalGun || "⚡ Disparar Pistola de Portales"}</span>
      </button>
    </div>
  );
};

export default PortalAnimation;
