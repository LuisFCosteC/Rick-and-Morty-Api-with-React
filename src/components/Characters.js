import React from "react";
import { Heart, ArrowUpRight, MapPin, Globe, Tv } from "lucide-react";
import { soundFx } from "../utils/audio";

const Characters = ({
  t,
  characters = [],
  onSelectCharacter,
  favorites = [],
  onToggleFavorite,
  viewMode = "grid",
}) => {
  if (characters.length === 0) {
    return null;
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "status-alive";
      case "dead":
        return "status-dead";
      default:
        return "status-unknown";
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return t.statusAlive;
      case "dead":
        return t.statusDead;
      default:
        return t.statusUnknown;
    }
  };

  return (
    <div
      className={
        viewMode === "grid"
          ? "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
          : "row row-cols-1 g-3"
      }
    >
      {characters.map((item) => {
        const isFavorite = favorites.includes(item.id);
        const statusLabel = getStatusLabel(item.status);
        const statusClass = getStatusClass(item.status);

        return (
          <div key={item.id} className="col">
            <div
              className={`rm-card ${viewMode === "list" ? "rm-card-list" : ""}`}
              onClick={() => {
                soundFx.playClick();
                onSelectCharacter && onSelectCharacter(item);
              }}
              tabIndex={0}
              role="button"
              aria-label={`${t.viewDetails}: ${item.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  soundFx.playClick();
                  onSelectCharacter && onSelectCharacter(item);
                }
              }}
            >
              {/* Image Container with Badges */}
              <div className="rm-card-img-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Status Indicator Pill */}
                <div className="rm-status-badge">
                  <span className={`rm-status-dot ${statusClass}`}></span>
                  <span>{statusLabel}</span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  className={`rm-fav-badge ${isFavorite ? "favorited" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playClick();
                    onToggleFavorite(item.id);
                  }}
                  title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
                  aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
                >
                  <Heart
                    size={16}
                    fill={isFavorite ? "#ffffff" : "none"}
                    color={isFavorite ? "#ffffff" : "currentColor"}
                  />
                </button>
              </div>

              {/* Card Body & Info */}
              <div className="rm-card-body">
                <div>
                  <h2 className="rm-card-title" title={item.name}>
                    {item.name}
                  </h2>

                  <div className="rm-card-meta">
                    <div className="rm-card-meta-row">
                      <Globe size={14} className="text-muted shrink-0 mt-1" />
                      <span className="rm-card-meta-label">{t.cardSpecies}:</span>
                      <span className="rm-card-meta-value">{item.species}</span>
                    </div>

                    <div className="rm-card-meta-row">
                      <MapPin size={14} className="text-muted shrink-0 mt-1" />
                      <span className="rm-card-meta-label">{t.cardLocation}:</span>
                      <span className="rm-card-meta-value" title={item.location?.name}>
                        {item.location?.name || "Unknown"}
                      </span>
                    </div>

                    <div className="rm-card-meta-row">
                      <Tv size={14} className="text-muted shrink-0 mt-1" />
                      <span className="rm-card-meta-label">{t.cardEpisodes}:</span>
                      <span className="rm-card-meta-value">
                        {item.episode?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="rm-card-footer-btn">
                  <span>{t.viewDetails}</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Characters;
