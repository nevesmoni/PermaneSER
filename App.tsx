import React, { useState } from "react";


import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Explorar from "./pages/Explorar";
import Documentar from "./pages/Documentar";
import Reimaginar from "./pages/Reimaginar";
import Sobre from "./pages/Sobre";
import Participe from "./pages/Participe";
import Contato from "./pages/Contato";
import Caso from "./pages/Caso";

import "./styles.css";

export type Page =
  | "home"
  | "explorar"
  | "documentar"
  | "reimaginar"
  | "sobre"
  | "participe"
  | "contato"
  | "caso";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(
    null
  );

  function navigate(nextPage: Page) {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function openCase(caseId: string) {
    setSelectedCaseId(caseId);
    setPage("caso");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function renderPage() {
    switch (page) {
      case "home":
        return <Home navigate={navigate} />;

      case "explorar":
        return (
          <Explorar
            navigate={navigate}
            openCase={openCase}
          />
        );

      case "documentar":
        return <Documentar navigate={navigate} />;

      case "reimaginar":
        return (
          <Reimaginar
            navigate={navigate}
          />
        );

      case "sobre":
        return <Sobre navigate={navigate} />;

      case "participe":
        return <Participe navigate={navigate} />;

      case "contato":
        return <Contato navigate={navigate} />;

      case "caso":
        return (
          <Caso
            navigate={navigate}
            caseId={selectedCaseId}
          />
        );

      default:
        return <Home navigate={navigate} />;
    }
  }

  return (
    <>
      <Header
        currentPage={page}
        navigate={navigate}
      />

      {renderPage()}

      <Footer navigate={navigate} />
    </>
  );
}

export default App;