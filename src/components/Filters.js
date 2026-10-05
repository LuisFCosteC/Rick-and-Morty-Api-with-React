import React from "react";
import { Search, X, RotateCcw, LayoutGrid, List, Sparkles, Filter } from "lucide-react";

const Filters = ({
  t,
  searchName,
  setSearchName,
  status,
  setStatus,
  gender,
  setGender,
  species,
  setSpecies,
  onReset,
  totalResults,
  viewMode,
  setViewMode,
  onRandomCharacter,
}) => {
  const activeCount =
    (searchName ? 1 : 0) +
    (status ? 1 : 0) +
    (gender ? 1 : 0) +
    (species ? 1 : 0);

  return (
    <section className="rm-search-card" aria-label="Filters Console">
      {/* Primary Search Bar & Actions */}
      <div className="row g-3 align-items-center mb-3">
        {/* Search Name Input */}
        <div className="col-12 col-lg-6">
          <label htmlFor="search-input" className="rm-form-label">
            <Search size={15} />
            {t.searchLabel}
          </label>
          <div className="rm-input-wrapper">
            <Search size={18} className="rm-input-icon" />
            <input
              id="search-input"
              type="text"
              className="rm-input rm-input-with-icon"
              placeholder={t.searchPlaceholder}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              autoComplete="off"
            />
            {searchName && (
              <button
                type="button"
                className="rm-input-clear"
                onClick={() => setSearchName("")}
                aria-label="Clear search"
                title="Clear"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Species Filter */}
        <div className="col-6 col-md-4 col-lg-3">
          <label htmlFor="species-select" className="rm-form-label">
            <Filter size={15} />
            {t.speciesLabel}
          </label>
          <select
            id="species-select"
            className="rm-select form-select"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="">{t.allSpecies}</option>
            <option value="Human">{t.speciesHuman}</option>
            <option value="Alien">{t.speciesAlien}</option>
            <option value="Humanoid">{t.speciesHumanoid}</option>
            <option value="Robot">{t.speciesRobot}</option>
            <option value="Animal">{t.speciesAnimal}</option>
            <option value="Mythological Creature">{t.speciesMythological}</option>
            <option value="Cronenberg">{t.speciesCronenberg}</option>
            <option value="Poopybutthole">{t.speciesPoopybutthole}</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div className="col-6 col-md-4 col-lg-3">
          <label htmlFor="gender-select" className="rm-form-label">
            {t.genderLabel}
          </label>
          <select
            id="gender-select"
            className="rm-select form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">{t.allGenders}</option>
            <option value="female">{t.genderFemale}</option>
            <option value="male">{t.genderMale}</option>
            <option value="genderless">{t.genderGenderless}</option>
            <option value="unknown">{t.genderUnknown}</option>
          </select>
        </div>
      </div>

      {/* Secondary Row: Status Segmented Controls, View Toggle & Reset */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pt-2 border-top border-opacity-10 border-secondary">
        {/* Status Segmented Buttons */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="rm-status-filter-label d-none d-sm-inline">
            {t.statusLabel}:
          </span>
          <div className="rm-segmented-control" role="group" aria-label="Status filter">
            <button
              type="button"
              className={`rm-segment-btn ${status === "" ? "active" : ""}`}
              onClick={() => setStatus("")}
            >
              {t.allStatus}
            </button>
            <button
              type="button"
              className={`rm-segment-btn ${status === "alive" ? "active" : ""}`}
              onClick={() => setStatus("alive")}
            >
              <span className="rm-status-dot status-alive"></span>
              {t.statusAlive}
            </button>
            <button
              type="button"
              className={`rm-segment-btn ${status === "dead" ? "active" : ""}`}
              onClick={() => setStatus("dead")}
            >
              <span className="rm-status-dot status-dead"></span>
              {t.statusDead}
            </button>
            <button
              type="button"
              className={`rm-segment-btn ${status === "unknown" ? "active" : ""}`}
              onClick={() => setStatus("unknown")}
            >
              <span className="rm-status-dot status-unknown"></span>
              {t.statusUnknown}
            </button>
          </div>
        </div>

        {/* View Mode & Reset Controls */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          {/* View Mode (Grid / List) */}
          <div className="rm-segmented-control" role="group" aria-label="View mode">
            <button
              type="button"
              className={`rm-segment-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title={t.viewGrid}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              className={`rm-segment-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title={t.viewList}
            >
              <List size={15} />
            </button>
          </div>

          {/* Reset Filters Button */}
          {activeCount > 0 && (
            <button
              type="button"
              className="rm-btn-reset"
              onClick={onReset}
              title={t.resetFilters}
            >
              <RotateCcw size={14} />
              <span>{t.clearAll}</span>
            </button>
          )}

          {/* Mobile Random Warp */}
          <button
            type="button"
            className="rm-btn-warp d-inline-flex d-sm-none"
            onClick={onRandomCharacter}
            title={t.randomCharacterDesc}
          >
            <Sparkles size={15} />
          </button>
        </div>
      </div>

      {/* Results Summary Bar */}
      {totalResults !== undefined && (
        <div className="mt-3 pt-2 border-top border-opacity-10 border-secondary d-flex justify-content-between align-items-center rm-results-text">
          <div>
            <span className="rm-results-text">{t.resultsFound}</span>{" "}
            <strong style={{ color: "var(--rm-text-primary)" }}>
              {totalResults}
            </strong>
          </div>
          {activeCount > 0 && (
            <span
              className="badge"
              style={{
                backgroundColor: "var(--rm-surface-subtle)",
                color: "var(--rm-portal-cyan)",
                border: "1px solid var(--rm-border)",
                fontWeight: 600,
              }}
            >
              {activeCount} {t.activeFilters}
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default Filters;
