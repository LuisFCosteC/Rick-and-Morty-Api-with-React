import React from "react";

const Footer = () => {
  return (
    <footer className="rm-footer">
      <div className="container">
        <p className="mb-2">
          Desarrollado con ❤️ usando{" "}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
            React
          </a>{" "}
          y datos de{" "}
          <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">
            The Rick and Morty API
          </a>
        </p>
        <p className="small mb-0 text-muted">
          Proyecto preparado para despliegue en Vercel
        </p>
      </div>
    </footer>
  );
};

export default Footer;
