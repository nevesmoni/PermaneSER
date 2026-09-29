import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

interface ExplorarProps {
  navigate: (page: string) => void;
  openCase: (caseId: string) => void;
}

type Filter = "todos" | "pendentes" | "reimaginados";

interface PublicCase {
  id: number;
  created_at: string;
  cidade: string | null;
  localização: string | null;
  titulo: string | null;
  descrição: string | null;
  permanência: string | null;
  informações_adicionais: string | null;
  imagem_url: string | null;
  status: string | null;
  redesign_count: number;
}

function Explorar({ navigate, openCase }: ExplorarProps) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [cases, setCases] = useState<PublicCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCases() {
      setLoading(true);

      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar casos:", error);
        setCases([]);
        setLoading(false);
        return;
      }

      console.log("Casos carregados:", data);

      setCases(data || []);
      setLoading(false);
    }

    loadCases();
  }, []);

  const filteredCases = cases.filter((item) => {
    if (filter === "pendentes") {
      return item.redesign_count === 0;
    }

    if (filter === "reimaginados") {
      return item.redesign_count > 0;
    }

    return true;
  });

  return (
    <div className="explore-page">

      <section className="explore-header">

        <div className="explore-number">
          02
        </div>

        <div>

          <span className="section-label">
            ARQUIVO PÚBLICO
          </span>

          <h1>
            Explorar
            <br />
            <em>os casos.</em>
          </h1>

          <p>
            Este é o arquivo de espaços documentados pelo PermaneSER.
            Cada registro parte de uma observação sobre a forma como
            aquele lugar pode — ou não pode — ser utilizado.
          </p>

        </div>

        <div className="explore-side-note">
          <span>CURITIBA</span>
          <span>2026</span>
        </div>

      </section>

      <section className="archive-section">

        <div className="archive-toolbar">

          <div>
            <span className="archive-count">
              {loading ? "..." : filteredCases.length} casos
            </span>

            <span className="archive-description">
              no arquivo
            </span>
          </div>

          <div className="archive-filters">

            <button
              className={
                filter === "todos"
                  ? "filter-active"
                  : ""
              }
              onClick={() => setFilter("todos")}
            >
              Todos
            </button>

            <button
              className={
                filter === "pendentes"
                  ? "filter-active"
                  : ""
              }
              onClick={() => setFilter("pendentes")}
            >
              Ainda não reimaginados
            </button>

            <button
              className={
                filter === "reimaginados"
                  ? "filter-active"
                  : ""
              }
              onClick={() => setFilter("reimaginados")}
            >
              Já reimaginados
            </button>

          </div>

        </div>

        <div className="archive-grid">

          {loading ? (

            <p>Carregando casos...</p>

          ) : filteredCases.length === 0 ? (

            <p>Nenhum caso encontrado.</p>

          ) : (

            filteredCases.map((item) => (

              <article
                className="archive-card"
                key={item.id}
                onClick={() =>
                  openCase(String(item.id))
                }
              >

                <div
                  className="archive-card-image"
                  style={
                    item.imagem_url
                      ? {
                          backgroundImage: `url(${item.imagem_url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >

                  <span>
                    CASO{" "}
                    {String(item.id).padStart(3, "0")}
                  </span>

                  <div className="archive-image-mark">
                    +
                  </div>

                </div>

                <div className="archive-card-body">

                  <div className="archive-card-top">

                    <span>
                      Espaço público
                    </span>

                    <span>
                      {item.localização ||
                        item.cidade ||
                        "—"}
                    </span>

                  </div>

                  <h2>
                    {item.titulo ||
                      `Caso ${item.id}`}
                  </h2>

                  <p>
                    {item.descrição ||
                      "Sem descrição disponível."}
                  </p>

                  <div className="archive-card-bottom">

                    <span
                      className={
                        item.redesign_count === 0
                          ? "status-pending"
                          : "status-done"
                      }
                    >
                      {item.redesign_count === 0
                        ? "Ainda não reimaginado"
                        : `${item.redesign_count} reimaginação${
                            item.redesign_count > 1
                              ? "ões"
                              : ""
                          }`}
                    </span>

                    <span className="archive-arrow">
                      →
                    </span>

                  </div>

                </div>

              </article>

            ))

          )}

        </div>

      </section>

      <section className="explore-question">

        <div className="explore-question-copy">

          <span className="section-label">
            04
          </span>

          <h2>
            E se fosse
            <br />
            diferente?
          </h2>

          <p>
            Os casos do arquivo também podem se tornar
            ponto de partida para novas propostas.
            Estudantes, arquitetos e outras pessoas
            interessadas podem escolher um caso e imaginar
            outra forma de ocupar aquele espaço.
          </p>

          <button
            className="explore-reimagine-button"
            onClick={() => navigate("reimaginar")}
          >
            Reimaginar este caso
            <span>→</span>
          </button>

        </div>

        <div className="explore-question-visual">

          {cases.length > 0 &&
          cases[0].imagem_url ? (

            <>
              <img
                src={cases[0].imagem_url}
                alt={
                  cases[0].titulo ||
                  "Caso documentado pelo PermaneSER"
                }
              />

              <div className="explore-question-overlay">

                <span>
                  CASO{" "}
                  {String(cases[0].id).padStart(3, "0")}
                </span>

                <strong>
                  {cases[0].localização ||
                    cases[0].cidade ||
                    "Curitiba"}
                </strong>

              </div>
            </>

          ) : (

            <div className="explore-question-placeholder">
              <span>
                PRÓXIMO CASO
              </span>
            </div>

          )}

        </div>

      </section>

      <section className="explore-document">

        <div>

          <span className="section-label">
            NÃO ENCONTROU?
          </span>

          <h2>
            Talvez o próximo
            <br />
            caso seja o seu.
          </h2>

        </div>

        <button
          className="hero-button"
          onClick={() => navigate("documentar")}
        >
          Documentar um espaço
          <span>→</span>
        </button>

      </section>

    </div>
  );
}

export default Explorar;