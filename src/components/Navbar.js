import React from "react";
import { Sun, Moon, Globe, Heart, Sparkles, Compass, Volume2, VolumeX } from "lucide-react";

const Navbar = ({
  t,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  favoritesCount = 0,
  onlyFavorites,
  onToggleOnlyFavorites,
  onRandomCharacter,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="rm-navbar py-2 py-md-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand Zone */}
        <a className="rm-navbar-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <div className="rm-portal-orb" aria-hidden="true">
            <Compass size={20} color="#042f2e" />
          </div>
          <div>
            <span className="rm-brand-gradient brand-font">{t.brand}</span>
            <span className="d-none d-md-inline-block rm-tagline-text ms-2">
              · {t.tagline}
            </span>
          </div>
        </a>

        {/* Action Controls: Sound, Random, Favorites, Language, Theme */}
        <div className="d-flex align-items-center gap-2">
          {/* Audio Portal Gun SFX Toggle */}
          <button
            type="button"
            className="rm-nav-btn d-none d-md-inline-flex"
            onClick={onToggleMute}
            title={isMuted ? t.soundMuted : t.soundActive}
            aria-label="Toggle sound effects"
          >
            {isMuted ? (
              <VolumeX size={16} className="text-muted" />
            ) : (
              <Volume2 size={16} className="text-success" />
            )}
          </button>

          {/* Random Warp Button */}
          <button
            type="button"
            className="rm-nav-btn d-none d-sm-inline-flex"
            onClick={onRandomCharacter}
            title={t.randomCharacterDesc}
            aria-label={t.randomCharacter}
          >
            <Sparkles size={16} className="text-warning" />
            <span className="d-none d-lg-inline">{t.randomCharacter}</span>
          </button>

          {/* Favorites Filter Button */}
          <button
            type="button"
            className={`rm-nav-btn ${onlyFavorites ? "active" : ""}`}
            onClick={onToggleOnlyFavorites}
            title={t.onlyFavorites}
            aria-label={t.onlyFavorites}
          >
            <Heart
              size={16}
              fill={onlyFavorites || favoritesCount > 0 ? "currentColor" : "none"}
              className={favoritesCount > 0 && !onlyFavorites ? "text-danger" : ""}
            />
            <span className="d-none d-md-inline">{t.statFavorites}</span>
            <span
              className="badge rounded-pill ms-1"
              style={{
                backgroundColor: onlyFavorites ? "rgba(255,255,255,0.3)" : "var(--rm-border)",
                color: onlyFavorites ? "#ffffff" : "var(--rm-text-primary)",
                fontSize: "0.72rem",
                padding: "2px 6px",
              }}
            >
              {favoritesCount}
            </span>
          </button>

          {/* Language Toggle (ES / EN) */}
          <button
            type="button"
            className="rm-nav-btn"
            onClick={onToggleLang}
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            aria-label="Toggle language"
          >
            <Globe size={16} />
            <span className="text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
              {lang === "es" ? "ES" : "EN"}
            </span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            className="rm-nav-btn"
            onClick={onToggleTheme}
            title={theme === "dark" ? t.themeLight : t.themeDark}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={17} className="text-warning" />
            ) : (
              <Moon size={17} className="text-primary" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
