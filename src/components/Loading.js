import React from "react";

const Loading = ({ t }) => {
  return (
    <div className="rm-loader-container" role="status" aria-live="polite">
      <div className="rm-portal-spinner"></div>
      <div>
        <p className="fw-bold fs-5 mb-1" style={{ color: "var(--rm-text-primary)" }}>
          {t?.loadingText || "Abriendo portal dimensional..."}
        </p>
        <p className="text-muted small mb-0">
          {t?.loadingSubtext || "Sincronizando frecuencias del multiverso..."}
        </p>
      </div>
    </div>
  );
};

export default Loading;
