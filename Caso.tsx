import React, { useEffect, useState } from "react";
import type { Page } from "../App";
import { supabase } from "./lib/supabase";

interface CasoProps {
  navigate: (page: Page) => void;
  caseId: string | null;
}

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
  redesign_count: number;
}

interface PublishedRedesign {
  id: number;
  created_at: string;
  case_id: number;
  curso: string | null;
  titulo: string | null;
  descricao: string | null;
  motivo: string | null;
  imagem_url: string | null;
}

function Caso({ navigate, caseId }: CasoProps) {
  const [caseData, setCaseData] = useState<PublicCase | null>(null);
  const [redesigns, setRedesigns] = useState<PublishedRedesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCase() {
      if (!caseId) {
        setLoading(false);
        return;
      }

      const numericId = Number(caseId);

      const { data: caseResult, error: caseError } = await supabase
        .from("cases")
        .select("*")
        .eq("id", numericId)
        .single();

      if (caseError) {
        console.error("Erro ao carregar caso:", caseError);
        setLoading(false);
        return;
      }

      const { data: redesignResult, error: redesignError } =
        await supabase
          .from("published_redesigns")
          .select("*")
          .eq("case_id", numericId)
          .order("created_at", { ascending: false });

      if (redesignError) {
        console.error(
          "Erro ao carregar propostas:",
          redesignError
        );
      }

      setCaseData(caseResult);
      setRedesigns(redesignResult || []);
      setLoading(false);
    }

    loadCase();
  }, [caseId]);

  if (loading) {
    return (
      <main className="case-page">
        <section className="case-hero">
          <div className="case-hero-content">
            <h1>
              Carregando
              <br />
              caso...
            </h1>
          </div>
        </section>
      </main>
    );
  }

  if (!caseData) {
    return (
      <main className="case-page">
        <section className="case-hero">
          <div className="case-hero-top">
            <button
              className="case-back"
              onClick={() => navigate("explorar")}
            >
              ← Voltar ao arquivo
            </button>
          </div>

          <div className="case-hero-content">
            <h1>
              Caso não
              <br />
              encontrado.
            </h1>

            <p>
              Este caso não está disponível no arquivo público.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="case-page">

      {/* TOPO DO CASO */}
      <section className="case-hero">
        <div className="case-hero-top">
          <button
            className="case-back"
            onClick={() => navigate("explorar")}
          >
            ← Voltar ao arquivo
          </button>

          <span className="case-id">
            CASO {String(caseData.id).padStart(3, "0")}
          </span>
        </div>

        <div className="case-hero-content">
          <div className="case-label">
            <span className="case-dot"></span>
            ARQUIVO PERMANESER
          </div>

          <h1>
            Caso
            <br />
            selecionado.
          </h1>

          <p>
            Cada espaço documentado pelo PermaneSER registra uma
            situação concreta da cidade: aquilo que permite, aquilo
            que impede e as formas como diferentes corpos podem
            permanecer naquele lugar.
          </p>
        </div>
      </section>

      {/* IMAGEM / ÁREA VISUAL */}
      <section className="case-visual">
        <div
          className="case-image-placeholder"
          style={
            caseData.imagem_url
              ? {
                  backgroundImage: `url(${caseData.imagem_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {!caseData.imagem_url && (
            <span>IMAGEM DO CASO</span>
          )}

          <div className="case-image-cross case-image-cross-one"></div>
          <div className="case-image-cross case-image-cross-two"></div>
        </div>
      </section>

      {/* INFORMAÇÕES */}
      <section className="case-information">
        <div className="case-info-intro">
          <span className="section-number">01</span>

          <h2>
            Observar antes
            <br />
            de intervir.
          </h2>
        </div>

        <div className="case-info-text">
          <p>
            Este caso foi selecionado a partir do arquivo do
            PermaneSER. A documentação busca observar o espaço
            como ele existe hoje, sem presumir a intenção de quem
            o projetou.
          </p>

          <p>
            {caseData.descrição ||
              "A documentação deste caso ainda não possui uma descrição."}
          </p>

          {caseData.informações_adicionais && (
            <p>
              {caseData.informações_adicionais}
            </p>
          )}
        </div>
      </section>

      {/* DADOS DO CASO */}
      <section className="case-data">
        <div className="case-data-heading">
          <span className="section-number">02</span>

          <h2>Sobre este lugar</h2>
        </div>

        <div className="case-data-grid">

          <div className="case-data-item">
            <span>LOCALIZAÇÃO</span>

            <strong>
              {caseData.localização ||
                caseData.cidade ||
                "—"}
            </strong>
          </div>

          <div className="case-data-item">
            <span>CIDADE</span>

            <strong>
              {caseData.cidade || "—"}, Brasil
            </strong>
          </div>

          <div className="case-data-item">
            <span>PERMANÊNCIA</span>

            <strong>
              {caseData.permanência ||
                "Em observação"}
            </strong>
          </div>

          <div className="case-data-item">
            <span>REDESENHOS</span>

            <strong>
              {redesigns.length}{" "}
              {redesigns.length === 1
                ? "proposta"
                : "propostas"}
            </strong>
          </div>

        </div>
      </section>

      {/* PROPOSTAS APROVADAS */}
      {redesigns.length > 0 && (
        <section className="case-redesigns">

          <div className="case-redesigns-heading">

            <span className="section-number">
              03
            </span>

            <h2>
              Outras possibilidades
            </h2>

            <p>
              Propostas de redesenho que foram selecionadas
              para este caso.
            </p>

          </div>

          <div className="case-redesigns-grid">

            {redesigns.map((redesign) => (

              <article
                className="case-redesign-card"
                key={redesign.id}
              >

                <div
                  className="case-redesign-image"
                  style={{
                    width: "100%",
                    minHeight: "400px",
                    backgroundColor: "#ddd",
                    backgroundImage:
                      redesign.imagem_url
                        ? `url("${redesign.imagem_url}")`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >

                  {!redesign.imagem_url && (
                    <span>
                      IMAGEM DA PROPOSTA
                    </span>
                  )}

                </div>

                <div className="case-redesign-content">

                  <span>
                    PROPOSTA DE REDESENHO
                  </span>

                  <h3>
                    {redesign.titulo ||
                      "Sem título"}
                  </h3>

                  {redesign.curso && (
                    <small>
                      {redesign.curso}
                    </small>
                  )}

                  <p>
                    {redesign.descricao ||
                      "Sem descrição."}
                  </p>

                  {redesign.motivo && (
                    <p>
                      <strong>
                        Por que importa:
                      </strong>{" "}
                      {redesign.motivo}
                    </p>
                  )}

                </div>

              </article>

            ))}

          </div>

        </section>
      )}

      {/* REIMAGINAR */}
      <section className="case-reimagine">

        <div className="case-reimagine-copy">

          <span className="section-number">
            {redesigns.length > 0 ? "04" : "03"}
          </span>

          <h2>
            E se fosse
            <br />
            diferente?
          </h2>

          <p>
            Os casos do arquivo também podem se tornar ponto de
            partida para novas propostas. Estudantes, arquitetos
            e outras pessoas interessadas podem escolher um caso
            e imaginar outra forma de ocupar aquele espaço.
          </p>

          <button
            className="button-primary"
            onClick={() => navigate("reimaginar")}
          >
            Reimaginar este caso →
          </button>

        </div>

        <div className="case-drawing">

          <div className="drawing-line drawing-line-one"></div>
          <div className="drawing-line drawing-line-two"></div>
          <div className="drawing-line drawing-line-three"></div>

          <span>
            REIMAGINAR
          </span>

        </div>

      </section>

      {/* RODAPÉ DO CASO */}
      <section className="case-footer">

        <span>
          PERMANESER
        </span>

        <h2>
          Documentar.
          <br />
          Investigar.
          <br />
          Reimaginar.
        </h2>

        <button
          className="button-secondary"
          onClick={() => navigate("explorar")}
        >
          ← Voltar para o arquivo
        </button>

      </section>

    </main>
  );
}

export default Caso;