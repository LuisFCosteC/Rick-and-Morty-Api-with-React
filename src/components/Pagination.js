import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({
  t,
  prev,
  next,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  currentPage = 1,
  totalPages = 1,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="rm-pagination-wrapper" aria-label="Pagination">
      <div className="rm-pagination-info">
        {t.page} <span>{currentPage}</span> {t.of} <span>{totalPages}</span>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
        {/* First Page */}
        {onFirst && (
          <button
            type="button"
            className="rm-page-btn"
            onClick={onFirst}
            disabled={currentPage === 1}
            title={t.firstPage}
            aria-label={t.firstPage}
          >
            <ChevronsLeft size={16} />
            <span className="d-none d-md-inline">{t.firstPage}</span>
          </button>
        )}

        {/* Previous Page */}
        <button
          type="button"
          className="rm-page-btn"
          onClick={onPrevious}
          disabled={!prev}
          aria-label={t.previous}
        >
          <ChevronLeft size={16} />
          <span>{t.previous}</span>
        </button>

        {/* Next Page */}
        <button
          type="button"
          className="rm-page-btn"
          onClick={onNext}
          disabled={!next}
          aria-label={t.next}
        >
          <span>{t.next}</span>
          <ChevronRight size={16} />
        </button>

        {/* Last Page */}
        {onLast && (
          <button
            type="button"
            className="rm-page-btn"
            onClick={onLast}
            disabled={currentPage === totalPages}
            title={t.lastPage}
            aria-label={t.lastPage}
          >
            <span className="d-none d-md-inline">{t.lastPage}</span>
            <ChevronsRight size={16} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
