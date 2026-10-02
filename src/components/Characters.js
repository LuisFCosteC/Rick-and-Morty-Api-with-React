import React from "react";

const Characters = ({ characters = [], onSelectCharacter }) => {
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

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {characters.map((item) => (
        <div key={item.id} className="col">
          <div
            className="rm-card"
            onClick={() => onSelectCharacter && onSelectCharacter(item)}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalles de ${item.name}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelectCharacter && onSelectCharacter(item);
              }
            }}
          >
            <div className="rm-card-img-wrapper">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
              <div className="rm-card-status-pill">
                <span className={`rm-status-dot ${getStatusClass(item.status)}`}></span>
                <span>{item.status}</span>
              </div>
            </div>

            <div className="rm-card-body">
              <div>
                <h2 className="rm-card-title" title={item.name}>
                  {item.name}
                </h2>
                <p className="rm-card-info-item">
                  <strong>Especie:</strong> {item.species}
                </p>
                <p className="rm-card-info-item text-truncate">
                  <strong>Ubicación:</strong> {item.location?.name || "Desconocida"}
                </p>
              </div>

              <div className="rm-card-footer-btn">
                Ver Detalles ➜
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
