import React, { useEffect, useState, useCallback, useMemo } from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import Loading from "./components/Loading";
import CharacterModal from "./components/CharacterModal";
import Footer from "./components/Footer";
import PortalAnimation from "./components/PortalAnimation";
import RickQuotes from "./components/RickQuotes";
import { translations } from "./translations";
import { soundFx } from "./utils/audio";
import { Heart, RefreshCw, AlertCircle, Compass, CheckCircle } from "lucide-react";
import "./App.css";

const BASE_API_URL = "https://rickandmortyapi.com/api/character";

function App() {
  // Localization state (ES / EN)
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("rm_lang");
    if (saved === "es" || saved === "en") return saved;
    const navLang = navigator.language?.slice(0, 2);
    return navLang === "en" ? "en" : "es";
  });

  const t = useMemo(() => translations[lang] || translations.es, [lang]);

  // Theme state (Dark / Light)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("rm_theme");
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  });

  // Sound SFX state
  const [isMuted, setIsMuted] = useState(() => soundFx.isMuted());

  const handleToggleMute = () => {
    const newMuted = soundFx.toggleMute();
    setIsMuted(newMuted);
    showToast(newMuted ? t.soundMuted : t.soundActive);
  };

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rm_theme", theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#070b12" : "#f3f7f4");
    }
  }, [theme]);

  // Sync language to HTML lang
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("rm_lang", lang);
  }, [lang]);

  // View mode (Grid / List)
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("rm_view_mode") || "grid";
  });

  const handleSetViewMode = (mode) => {
    soundFx.playClick();
    setViewMode(mode);
    localStorage.setItem("rm_view_mode", mode);
  };

  // Favorites state (array of IDs)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("rm_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Toggle favorite handler
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((favId) => favId !== id) : [...prev, id];
      localStorage.setItem("rm_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Data & Filters state
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({ count: 826, pages: 42 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Selected character for Modal
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Construct URL with query parameters
  const buildUrl = useCallback(
    (pageNumber = 1) => {
      const params = new URLSearchParams();
      params.append("page", pageNumber);
      if (searchName.trim()) params.append("name", searchName.trim());
      if (status) params.append("status", status);
      if (gender) params.append("gender", gender);
      if (species) params.append("species", species);

      return `${BASE_API_URL}/?${params.toString()}`;
    },
    [searchName, status, gender, species]
  );

  // Main fetch function
  const fetchCharacters = useCallback(
    async (url) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.results) {
          setCharacters(data.results);
          setInfo(data.info || {});
        } else {
          // API returns 404 when no characters match query
          setCharacters([]);
          setInfo({});
          setError("no_results");
        }
      } catch (err) {
        console.error("Error fetching characters:", err);
        setCharacters([]);
        setInfo({});
        setError("network_error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch Favorites specifically when onlyFavorites mode is active
  const fetchFavoritesData = useCallback(async () => {
    if (favorites.length === 0) {
      setCharacters([]);
      setInfo({ count: 0, pages: 1 });
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_API_URL}/${favorites.join(",")}`;
      const response = await fetch(url);
      const data = await response.json();

      const results = Array.isArray(data) ? data : data.id ? [data] : [];
      setCharacters(results);
      setInfo({ count: results.length, pages: 1 });
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError("network_error");
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  // Effect when filters or onlyFavorites toggle changes
  useEffect(() => {
    if (onlyFavorites) {
      fetchFavoritesData();
      return;
    }

    setCurrentPage(1);
    const timeoutId = setTimeout(() => {
      const url = buildUrl(1);
      fetchCharacters(url);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [buildUrl, fetchCharacters, onlyFavorites, fetchFavoritesData]);

  // Pagination navigation
  const handlePrevious = () => {
    soundFx.playClick();
    if (info.prev) {
      const newPage = Math.max(1, currentPage - 1);
      setCurrentPage(newPage);
      fetchCharacters(info.prev);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (info.next) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchCharacters(info.next);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  const handleFirstPage = () => {
    soundFx.playClick();
    setCurrentPage(1);
    const url = buildUrl(1);
    fetchCharacters(url);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleLastPage = () => {
    soundFx.playClick();
    if (info.pages) {
      setCurrentPage(info.pages);
      const url = buildUrl(info.pages);
      fetchCharacters(url);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    soundFx.playClick();
    setSearchName("");
    setStatus("");
    setGender("");
    setSpecies("");
    setCurrentPage(1);
    setOnlyFavorites(false);
  };

  // Random character fetch (Portal Gun warp)
  const handleRandomCharacter = async () => {
    try {
      soundFx.playPortalSound();
      const randomId = Math.floor(Math.random() * 826) + 1;
      const response = await fetch(`${BASE_API_URL}/${randomId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedCharacter(data);
      }
    } catch (err) {
      console.error("Error fetching random character:", err);
    }
  };

  // Dimension sector / quick filter jump
  const handleSelectDimension = (target) => {
    soundFx.playPortalSound();
    if (typeof target === "object" && target !== null) {
      setSearchName(target.name || "");
      setSpecies(target.species || "");
      setStatus(target.status || "");
      setGender(target.gender || "");
    } else if (typeof target === "string") {
      setSearchName(target);
      setSpecies("");
      setStatus("");
      setGender("");
    }
    setCurrentPage(1);
    setOnlyFavorites(false);
  };

  // Calculate live statistics
  const aliveCount = characters.filter((c) => c.status?.toLowerCase() === "alive").length;
  const alivePercentage = characters.length > 0 ? Math.round((aliveCount / characters.length) * 100) : 0;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Top Bar */}
      <Navbar
        t={t}
        lang={lang}
        onToggleLang={() => {
          soundFx.playClick();
          setLang((prev) => (prev === "es" ? "en" : "es"));
        }}
        theme={theme}
        onToggleTheme={() => {
          soundFx.playClick();
          setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        }}
        favoritesCount={favorites.length}
        onlyFavorites={onlyFavorites}
        onToggleOnlyFavorites={() => {
          soundFx.playClick();
          setOnlyFavorites((prev) => !prev);
        }}
        onRandomCharacter={handleRandomCharacter}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <main className="container flex-grow-1" id="top">
        {/* Hero Section with Interactive Portal */}
        <section className="rm-hero text-center">
          <h1 className="rm-hero-title">
            {t.heroTitle}{" "}
            <span className="rm-brand-gradient">{t.heroTitleHighlight}</span>
          </h1>
          <p className="rm-hero-lead">{t.heroSubtitle}</p>

          {/* Interactive Portal Gun Warp Hero */}
          <PortalAnimation t={t} onWarp={handleRandomCharacter} />

          {/* Multiverse Live Stats Strip */}
          <div className="rm-stats-strip">
            <div className="rm-stat-card">
              <div className="rm-stat-value">{info.count || 0}</div>
              <div className="rm-stat-label">{t.statTotal}</div>
            </div>

            <div className="rm-stat-card">
              <div className="rm-stat-value text-success">{alivePercentage}%</div>
              <div className="rm-stat-label">{t.statAliveRate}</div>
            </div>

            <div className="rm-stat-card">
              <div className="rm-stat-value text-info">126+</div>
              <div className="rm-stat-label">{t.statDimensions}</div>
            </div>

            <div className="rm-stat-card">
              <div className="rm-stat-value text-danger">{favorites.length}</div>
              <div className="rm-stat-label">{t.statFavorites}</div>
            </div>
          </div>
        </section>

        {/* Rick & Morty Universe Quotes & Dimension Hopper */}
        <RickQuotes
          lang={lang}
          t={t}
          onSelectDimension={handleSelectDimension}
        />

        {/* Search & Filter Console */}
        <Filters
          t={t}
          searchName={searchName}
          setSearchName={setSearchName}
          status={status}
          setStatus={setStatus}
          gender={gender}
          setGender={setGender}
          species={species}
          setSpecies={setSpecies}
          onReset={handleResetFilters}
          totalResults={info.count}
          viewMode={viewMode}
          setViewMode={handleSetViewMode}
          onRandomCharacter={handleRandomCharacter}
        />

        {/* Active Favorites Notification Banner */}
        {onlyFavorites && (
          <div
            className="d-flex align-items-center justify-content-between p-3 rounded-4 mb-4"
            style={{
              backgroundColor: "var(--rm-surface-subtle)",
              border: "1px solid var(--rm-portal-cyan)",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <Heart size={18} className="text-danger fill-current" />
              <span className="fw-semibold">
                {t.showingFavorites} ({favorites.length})
              </span>
            </div>
            <button
              type="button"
              className="rm-btn-reset py-1 px-3"
              onClick={() => setOnlyFavorites(false)}
            >
              {t.allStatus}
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && <Loading t={t} />}

        {/* Empty Favorites State */}
        {!loading && onlyFavorites && favorites.length === 0 && (
          <div className="text-center py-5">
            <Heart size={48} className="text-muted mx-auto mb-3" />
            <h4 className="fw-bold">{t.emptyFavoritesTitle}</h4>
            <p className="text-muted mx-auto" style={{ maxWidth: "480px" }}>
              {t.emptyFavoritesSubtext}
            </p>
            <button
              type="button"
              className="rm-btn-warp mt-3"
              onClick={() => setOnlyFavorites(false)}
            >
              <Compass size={16} />
              <span>{t.heroTitle} {t.heroTitleHighlight}</span>
            </button>
          </div>
        )}

        {/* Error / No Results State */}
        {!loading && !onlyFavorites && error && (
          <div className="text-center py-5">
            <AlertCircle size={48} className="text-warning mx-auto mb-3" />
            <h4 className="fw-bold">
              {error === "network_error" ? t.errorConnectionTitle : t.errorTitle}
            </h4>
            <p className="text-muted mx-auto" style={{ maxWidth: "500px" }}>
              {error === "network_error" ? t.errorConnectionSubtext : t.errorSubtext}
            </p>
            <button
              type="button"
              className="rm-page-btn mt-3"
              onClick={handleResetFilters}
            >
              <RefreshCw size={15} />
              <span>{t.resetFilters}</span>
            </button>
          </div>
        )}

        {/* Characters Grid / List & Pagination */}
        {!loading && !error && characters.length > 0 && (
          <>
            <Characters
              t={t}
              characters={characters}
              onSelectCharacter={(char) => setSelectedCharacter(char)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              viewMode={viewMode}
            />

            {!onlyFavorites && (
              <Pagination
                t={t}
                prev={info.prev}
                next={info.next}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onFirst={handleFirstPage}
                onLast={handleLastPage}
                currentPage={currentPage}
                totalPages={info.pages || 1}
              />
            )}
          </>
        )}
      </main>

      {/* Character Dossier Modal */}
      {selectedCharacter && (
        <CharacterModal
          t={t}
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          isFavorite={favorites.includes(selectedCharacter.id)}
          onToggleFavorite={handleToggleFavorite}
          onShowToast={showToast}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="rm-toast" role="status" aria-live="polite">
          <CheckCircle size={18} className="text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer t={t} />
    </div>
  );
}

export default App;
