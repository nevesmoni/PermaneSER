import React, { useState } from "react";
import type { Page } from "../App";

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

function Header({ currentPage, navigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "Explorar", page: "explorar" },
    { label: "Documentar", page: "documentar" },
    { label: "Reimaginar", page: "reimaginar" },
    { label: "Sobre", page: "sobre" },
    { label: "Participe", page: "participe" },
    { label: "Contato", page: "contato" },
  ];

  function handleNavigate(page: Page) {
    navigate(page);
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <button
        className="brand"
        onClick={() => handleNavigate("home")}
        aria-label="Voltar para o início"
      >
        <img
          src="/logo-permaneser.png"
          alt="PermaneSER"
          className="brand-logo"
        />
      </button>

      <nav className="navigation">
        {links.map((link) => (
          <button
            key={link.page}
            className={`nav-link ${
              currentPage === link.page ||
              (currentPage === "caso" && link.page === "explorar")
                ? "active"
                : ""
            }`}
            onClick={() => handleNavigate(link.page)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button
        className={`header-menu-button ${
          menuOpen ? "open" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={
          menuOpen
            ? "Fechar menu"
            : "Abrir menu"
        }
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {menuOpen && (
        <nav className="mobile-navigation">
          {links.map((link) => (
            <button
              key={link.page}
              className={`mobile-nav-link ${
                currentPage === link.page ||
                (currentPage === "caso" &&
                  link.page === "explorar")
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigate(link.page)
              }
            >
              <span>{link.label}</span>
              <span>→</span>
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;