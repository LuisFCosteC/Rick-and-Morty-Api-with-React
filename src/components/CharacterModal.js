import React, { useEffect, useState } from "react";
import { X, Heart, Share2, Check, ExternalLink, MapPin, Globe, Dna, Tv, Compass, Shield, ShieldAlert } from "lucide-react";
import { soundFx } from "../utils/audio";

const CharacterModal = ({
  t,
  character,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    soundFx.playPortalSound();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!character) return null;

  const statusClass =
    character.status?.toLowerCase() === "alive"
      ? "status-alive"
      : character.status?.toLowerCase() === "dead"
      ? "status-dead"
      : "status-unknown";

  const statusText =
    character.status?.toLowerCase() === "alive"
      ? t.statusAlive
      : character.status?.toLowerCase() === "dead"
      ? t.statusDead
      : t.statusUnknown;

  // Danger rating based on species and status
  const getDangerLevel = () => {
    if (character.status?.toLowerCase() === "dead") return { label: t.dangerLow, color: "text-muted" };
    if (character.name?.toLowerCase().includes("rick") || character.species?.toLowerCase().includes("cronenberg")) {
      return { label: t.dangerHigh, color: "text-danger" };
    }
    if (character.species?.toLowerCase().includes("alien") || character.species?.toLowerCase().includes("robot")) {
      return { label: t.dangerMedium, color: "text-warning" };
    }
    return { label: t.dangerLow, color: "text-success" };
  };

  const danger = getDangerLevel();

  const handleShare = () => {
    soundFx.playClick();
    const shareText = `${character.name} — ${character.species} (${character.status}) | Rick & Morty Multiverse Explorer: https://rickandmortyapi.com/api/character/${character.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      if (onShowToast) onShowToast(t.modalShareSuccess);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Format episode IDs
  const episodeNumbers = (character.episode || []).map((epUrl) => {
    const parts = epUrl.split("/");
    return parts[parts.length - 1];
  });

  return (
    <div
      className="rm-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-character-name"
    >
      <div className="rm-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="rm-modal-header">
          <div className="d-flex align-items-center gap-2">
            <span
              className="badge"
              style={{
                backgroundColor: "var(--rm-surface-subtle)",
                color: "var(--rm-portal-green)",
                border: "1px solid var(--rm-border)",
                fontSize: "0.8rem",
                padding: "4px 8px",
              }}
            >
              #{character.id}
            </span>
            <h3 className="modal-title mb-0 fw-bold" id="modal-character-name">
              {character.name}
            </h3>
          </div>
          <button
            type="button"
            className="rm-modal-close"
            onClick={onClose}
            aria-label={t.modalClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="rm-modal-body">
          {/* Portrait Banner */}
          <div className="d-flex flex-column flex-sm-row align-items-center gap-4 p-3 rounded-4 mb-4" style={{ backgroundColor: "var(--rm-surface-subtle)", border: "1px solid var(--rm-border)" }}>
            <div style={{ position: "relative" }}>
              <img
                src={character.image}
                alt={character.name}
                className="rounded-4 shadow-sm"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  border: "2px solid var(--rm-border)",
                }}
                referrerPolicy="no-referrer"
              />
              <div
                className="rm-status-badge"
                style={{ top: "8px", left: "8px", fontSize: "0.72rem" }}
              >
                <span className={`rm-status-dot ${statusClass}`}></span>
                <span>{statusText}</span>
              </div>
            </div>

            <div className="text-center text-sm-start flex-grow-1">
              <h4 className="fw-bold mb-1">{character.name}</h4>
              <p className="text-muted small mb-3">
                {character.species} {character.type ? `· ${character.type}` : ""}
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-2">
                <button
                  type="button"
                  className={`rm-nav-btn ${isFavorite ? "active" : ""}`}
                  onClick={() => onToggleFavorite(character.id)}
                >
                  <Heart
                    size={15}
                    fill={isFavorite ? "#ffffff" : "none"}
                    className={isFavorite ? "" : "text-danger"}
                  />
                  <span>{isFavorite ? t.removeFromFavorites : t.addToFavorites}</span>
                </button>

                <button
                  type="button"
                  className="rm-nav-btn"
                  onClick={handleShare}
                >
                  {copied ? <Check size={15} className="text-success" /> : <Share2 size={15} />}
                  <span>{copied ? t.modalShareSuccess : t.modalShare}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <Compass size={18} className="text-success" />
            {t.modalDetails}
          </h5>

          <div className="rm-detail-grid">
            {/* Status */}
            <div className="rm-detail-box">
              <span className="label">
                <Shield size={12} className="me-1 inline" />
                {t.modalStatus}
              </span>
              <div className="value d-flex align-items-center gap-2">
                <span className={`rm-status-dot ${statusClass}`}></span>
                <span>{statusText}</span>
                <span className="text-muted small">({character.status})</span>
              </div>
            </div>

            {/* Danger Threat Level */}
            <div className="rm-detail-box">
              <span className="label">
                <ShieldAlert size={12} className="me-1 inline" />
                {t.dangerLevel}
              </span>
              <div className={`value ${danger.color} fw-bold`}>
                {danger.label}
              </div>
            </div>

            {/* Species */}
            <div className="rm-detail-box">
              <span className="label">
                <Dna size={12} className="me-1 inline" />
                {t.modalSpecies}
              </span>
              <div className="value">{character.species || "Unknown"}</div>
            </div>

            {/* Subspecies / Type */}
            <div className="rm-detail-box">
              <span className="label">{t.modalSubspecies}</span>
              <div className="value">{character.type || "—"}</div>
            </div>

            {/* Gender */}
            <div className="rm-detail-box">
              <span className="label">{t.modalGender}</span>
              <div className="value">{character.gender || "Unknown"}</div>
            </div>

            {/* Origin Dimension */}
            <div className="rm-detail-box">
              <span className="label">
                <Globe size={12} className="me-1 inline" />
                {t.modalOrigin}
              </span>
              <div className="value">{character.origin?.name || "Unknown"}</div>
            </div>

            {/* Last Known Location */}
            <div className="rm-detail-box">
              <span className="label">
                <MapPin size={12} className="me-1 inline" />
                {t.modalLocation}
              </span>
              <div className="value">{character.location?.name || "Unknown"}</div>
            </div>
          </div>

          {/* Episodes List */}
          <div className="mt-4 pt-3 border-top border-opacity-10 border-secondary">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <Tv size={16} className="text-info" />
                {t.modalEpisodesList}
              </h6>
              <span className="small text-muted">
                {t.modalEpisodeCount}: <strong style={{ color: "var(--rm-text-primary)" }}>{episodeNumbers.length}</strong>
              </span>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-2" style={{ maxHeight: "140px", overflowY: "auto" }}>
              {episodeNumbers.slice(0, 30).map((num) => (
                <span key={num} className="rm-episode-chip">
                  {t.modalEpisodeLabel} #{num}
                </span>
              ))}
              {episodeNumbers.length > 30 && (
                <span className="rm-episode-chip text-muted">
                  +{episodeNumbers.length - 30} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-top border-opacity-10 border-secondary d-flex justify-content-between align-items-center">
          <a
            href={character.url}
            target="_blank"
            rel="noopener noreferrer"
            className="small text-muted text-decoration-none d-flex align-items-center gap-1"
          >
            <span>Raw API Data</span>
            <ExternalLink size={13} />
          </a>
          <button
            type="button"
            className="rm-page-btn"
            onClick={onClose}
          >
            {t.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
