import React from "react";

const Navbar = ({ brand = "Rick and Morty Explorer" }) => {
  return (
    <header className="rm-navbar py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="rm-navbar-brand" href="/">
          <span role="img" aria-label="portal" style={{ fontSize: "1.7rem" }}>🧪</span>
          <span>{brand}</span>
        </a>
        <div className="d-flex align-items-center gap-2">
          <span className="rm-portal-badge d-none d-sm-inline-block">API v2</span>
          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-light rounded-pill px-3"
            style={{ fontSize: "0.8rem", borderColor: "#334155" }}
          >
            Doc API
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
