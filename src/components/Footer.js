import React from "react";
import { Heart, ExternalLink } from "lucide-react";

const Footer = ({ t }) => {
  return (
    <footer className="rm-footer">
      <div className="container">
        <div className="d-flex flex-column align-items-center gap-2">
          {/* Developer Credit Badge */}
          <a
            href="https://www.lfcc.2code.com.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="rm-dev-badge"
            title="Sitio Web de LFCC - Luis F. Coste C."
          >
            <span role="img" aria-label="code">💻</span>
            <span>{t.developerCredit || "Desarrollado por LFCC - Luis F. Coste C."}</span>
            <ExternalLink size={13} className="ms-1 opacity-75" />
          </a>

          <p className="mb-1 d-flex align-items-center justify-content-center gap-1 flex-wrap">
            <span>{t.footerMadeWith}</span>
            <Heart size={14} className="text-danger fill-current" />
            <span>—</span>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-1"
            >
              React
            </a>
            <span>&amp;</span>
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-1"
            >
              The Rick and Morty API <ExternalLink size={12} />
            </a>
          </p>

          <p className="small mb-0 text-muted mx-auto" style={{ maxWidth: "680px", lineHeight: "1.5" }}>
            {t.footerDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
