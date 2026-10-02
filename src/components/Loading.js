import React from "react";

const Loading = () => {
  return (
    <div className="rm-loader-container" role="status" aria-live="polite">
      <div className="rm-portal-spinner"></div>
      <p className="text-muted fw-semibold">Abriendo portal dimensional...</p>
    </div>
  );
};

export default Loading;
