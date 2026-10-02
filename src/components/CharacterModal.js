import React, { useEffect } from "react";

const CharacterModal = ({ character, onClose }) => {
  useEffect(() => {
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
    character.status.toLowerCase() === "alive"
      ? "status-alive"
      : character.status.toLowerCase() === "dead"
      ? "status-dead"
      : "status-unknown";

  const statusText =
    character.status.toLowerCase() === "alive"
      ? "Vivo"
      : character.status.toLowerCase() === "dead"
      ? "Muerto"
      : "Desconocido";

  return (
    <div
      className="rm-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-character-name"
    >
      <div
        className="rm-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rm-modal-header">
          <div className="d-flex align-items-center gap-2">
            <span className={`rm-status-dot ${statusClass}`}></span>
            <span className="badge bg-dark border border-secondary text-light">
              #{character.id}
            </span>
            <h5 className="modal-title mb-0 fw-bold text-light" id="modal-character-name">
              {character.name}
            </h5>
          </div>
          <button
            type="button"
            className="rm-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        <div className="rm-modal-body">
          <div className="text-center mb-4">
            <img
              src={character.image}
              alt={character.name}
              className="rounded-4 shadow"
              style={{ width: "180px", height: "180px", objectFit: "cover", border: "2px solid #1f293d" }}
            />
          </div>

          <div className="rm-detail-grid">
            <div className="rm-detail-box">
              <span className="label">Estado</span>
              <p className="value d-flex align-items-center gap-2 mb-0">
                <span className={`rm-status-dot ${statusClass}`}></span>
                {statusText} ({character.status})
              </p>
            </div>

            <div className="rm-detail-box">
              <span className="label">Especie</span>
              <p className="value mb-0">{character.species || "Desconocida"}</p>
            </div>

            <div className="rm-detail-box">
              <span className="label">Género</span>
              <p className="value mb-0">{character.gender || "Desconocido"}</p>
            </div>

            <div className="rm-detail-box">
              <span className="label">Episodios</span>
              <p className="value mb-0">
                Aparece en {character.episode ? character.episode.length : 0} episodio(s)
              </p>
            </div>

            <div className="rm-detail-box">
              <span className="label">Planeta / Origen</span>
              <p className="value mb-0">{character.origin?.name || "Desconocido"}</p>
            </div>

            <div className="rm-detail-box">
              <span className="label">Última Ubicación Conocida</span>
              <p className="value mb-0">{character.location?.name || "Desconocida"}</p>
            </div>
          </div>
        </div>

        <div className="p-3 border-top border-secondary border-opacity-25 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-light rounded-pill px-4"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
