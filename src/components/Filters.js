import React from "react";

const Filters = ({
  searchName,
  setSearchName,
  status,
  setStatus,
  gender,
  setGender,
  onReset,
  totalResults
}) => {
  return (
    <section className="rm-search-card" aria-label="Filtros de búsqueda">
      <div className="row g-3 align-items-end">
        {/* Buscador por Nombre */}
        <div className="col-12 col-md-5">
          <label htmlFor="search-input" className="form-label text-muted small fw-semibold">
            Buscar por Nombre
          </label>
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: "#243048" }}>
              🔍
            </span>
            <input
              id="search-input"
              type="text"
              className="form-control rm-input border-start-0"
              placeholder="Ej. Rick Sanchez, Morty..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>

        {/* Filtro por Estado */}
        <div className="col-6 col-md-3">
          <label htmlFor="status-select" className="form-label text-muted small fw-semibold">
            Estado
          </label>
          <select
            id="status-select"
            className="form-select rm-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="alive">Vivo (Alive)</option>
            <option value="dead">Muerto (Dead)</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        {/* Filtro por Género */}
        <div className="col-6 col-md-2">
          <label htmlFor="gender-select" className="form-label text-muted small fw-semibold">
            Género
          </label>
          <select
            id="gender-select"
            className="form-select rm-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        {/* Botón de limpiar filtros */}
        <div className="col-12 col-md-2 d-grid">
          <button
            type="button"
            className="btn rm-btn-reset d-flex align-items-center justify-content-center gap-1"
            onClick={onReset}
            title="Limpiar todos los filtros"
          >
            <span>✕</span> Limpiar
          </button>
        </div>
      </div>

      {totalResults !== undefined && (
        <div className="mt-3 pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center text-muted small">
          <span>
            Resultados encontrados: <strong className="text-light">{totalResults}</strong>
          </span>
          {(searchName || status || gender) && (
            <span className="badge bg-secondary bg-opacity-25 text-info">
              Filtros activos
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default Filters;
