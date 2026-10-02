import React from "react";

const Pagination = ({ prev, next, onPrevious, onNext, currentPage = 1, totalPages = 1 }) => {
  const handlePrevious = () => {
    if (prev) {
      onPrevious();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (next) {
      onNext();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="rm-pagination-wrapper" aria-label="Navegación de personajes">
      {totalPages > 0 && (
        <div className="rm-pagination-info">
          Página <span>{currentPage}</span> de <span>{totalPages}</span>
        </div>
      )}

      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="rm-page-btn"
          onClick={handlePrevious}
          disabled={!prev}
          aria-label="Página anterior"
        >
          <span>←</span> Anterior
        </button>

        <button
          type="button"
          className="rm-page-btn"
          onClick={handleNext}
          disabled={!next}
          aria-label="Página siguiente"
        >
          Siguiente <span>→</span>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
