import React from "react";
import type { Page } from "../App";

interface FooterProps {
  navigate: (page: Page) => void;
}

function Footer({ navigate }: FooterProps) {
  return (
    <footer className="footer">

      <div className="footer-top">

        <button
          className="footer-brand"
          onClick={() => navigate("home")}
          aria-label="Voltar para o início"
        >
          <img
            src="/logo-permaneser.png"
            alt="PermaneSER"
          />
        </button>

        <p>
          Espaços para permanecer.
          <br />
          Espaços para ser.
        </p>

      </div>

      <div className="footer-bottom">

        <span className="footer-copy">
          PERMANESER © 2026
        </span>

        <a
          className="footer-email"
          href="mailto:contato.permaneser@gmail.com"
        >
          contato.permaneser@gmail.com
        </a>

        <div className="footer-links">

          <button onClick={() => navigate("documentar")}>
            Documentar
          </button>

          <span>·</span>

          <button onClick={() => navigate("explorar")}>
            Investigar
          </button>

          <span>·</span>

          <button onClick={() => navigate("reimaginar")}>
            Reimaginar
          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;